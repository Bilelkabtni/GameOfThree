const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const Game = require('./helpers/gameOfThree.js')
const events = require('./helpers/events.js')

// load initial states
const states = require('./helpers/states.js')
const config = require('./helpers/config.js')
const game = new Game(states);

io.on('connection', (socket) => {
  game.addId(socket.id)
  io.emit(events.getStates, states)

  socket.on('disconnect', () => {
    console.log('user disconnected')
    game.removePlayer(socket.id)
    game.clearStates()
  })

  io.of('/').clients((error, clients) => {
    // we allow only 2 player
    if (clients.length > 2) {
      socket.disconnect();
      console.log('we allow only 2 player');
    }
    console.log('You have 2 connected player', clients.length)
  })

  socket.on(events.insertNumber, (move) => {
    console.log('insert a number')
    game.setNumber(move.value)
    game.switchTurn()
    game.addConversation(move, true)
    io.emit(events.getStates, states)
  })

  socket.on(events.AddMove, (move) => {
    game.addMove(move.value)
    game.calculate(move)
    game.switchTurn()
    game.addConversation(move)
    io.emit(events.getStates, states)
  })

  socket.on(events.gameRestart, () => {
    socket.disconnect()
  })
})

http.listen(config.port, () => {
  console.log('server running on port ', config.port)
})