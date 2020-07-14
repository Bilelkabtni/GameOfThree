import React from 'react'

const PlayActionControls = ({ ...props }: any) => {
  const inputEl = React.useRef(null);

  return (
    <div className="Play">
        <input 
        ref={inputEl} 
        placeholder="Please Enter a number"
        className={`Controls__input ${ props.checkNumber() ? "Controls--hidden" : null}`} 
        type="number" 
        name="number" 
        onChange={ (ev) => props.handleChange(ev.target.value) }/>
        <div className={`Controls__buttons ${ !props.checkNumber() ? "Controls--hidden" : null}`}>
          <button value={ -1 } onClick={ props.handleClick } disabled={ props.checkMoves(-1) }>-1</button>
          <button value={ 0 }  onClick={ props.handleClick } disabled={ props.checkMoves(0) }>0</button>
          <button value={ 1 }  onClick={ props.handleClick } disabled={ props.checkMoves(+1) }>+1</button>
        </div>
    </div>
  )
}

export default PlayActionControls