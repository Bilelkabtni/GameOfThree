class GameOfThree {
    states = [];
  
    constructor(states) {
      this.states = states;
    }
  
    setNumber(number) {
      this.states.prev = number;
      this.states.number = number;
    }
  
    addId(id) {
      for (let team of this.states.teams) {
        if (team.id === null) {
          team.id = id;
          break
        }
      }
    }
  
    removePlayer(id) {
      for (let team of this.states.teams) {
        if (team.id === id) {
          team.id = null;
          team.turn = false;
        } else {
          team.turn = true;
        }
      }
    }
  
    setWin(id) {
      for (let team of this.states.teams) {
        if (team.id === id) team.win = true;
        else team.win = false;
      }
    }
  
    clearStates() {
      this.states.teams.forEach((team) => {
        team.win = null;
      })
      this.states.prev = 0;
      this.states.number = 0;
      this.states.moves = [];
      this.states.conversation = [];
    }
  
    calculate(move) {
      var sum = this.states.number < 0 ?
        (Number(move.value) - Number(this.states.number)) :
        (Number(move.value) + Number(this.states.number))
      if (sum % 3 === 0 && this.states.number > 1) {
        this.states.prev = this.states.number;
        this.states.number = sum / 3;
        this.states.moves = [];
        if (this.states.number === 1) this.setWin(move.id);
      }
    }
  
    switchTurn() {
      this.states.teams.forEach((team) => {
        team.turn = !team.turn;
      })
    }
  
    addMove(value) {
      this.states.moves.push(value);
    }
  
    addConversation(conversation, isInsert = false) {
      if (isInsert) conversation.value = null;
      conversation.first = `[(${conversation.value}+${this.states.prev}) / 3]=${this.states.number}`
      conversation.second = this.states.number
      this.states.conversation.push(conversation);
    }
  
  }

  module.exports = GameOfThree;