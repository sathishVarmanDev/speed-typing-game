import React from "react";
import useWordGame from "./hooks/useWordGame";

function App() {

  const {
    text,
    handleOnChangeText,
    isDisabledTextarea,
    textareaRef,
    timer,
    startGame,
    isDisabledButton,
    textCount
  } = useWordGame()
  return (
    <div className="main">
      <h1>How fast do you type?</h1>
      {/* "(event) => handleOnChangeText(event)" is triggered when the "textarea" is changed(user types) */}
      {/* "value={text}" sets the value prop to be always in sync with "text state". "value" prop displays the current text on the screen. Try to set value prop to an empty string & you'll know what I mean */}
      <textarea value={text} onChange={(event) => handleOnChangeText(event)} disabled={isDisabledTextarea} ref={textareaRef} />
      <h4>{`Time remaining: ${timer}`}</h4>
      {/* triggers "startGame" once button is clicked */}
      <button className="start-button" onClick={startGame} disabled={isDisabledButton}>Start</button>
      {/* display "textCount" state */}
      <h1>{`Word Count: ${textCount}`}</h1>
    </div>
  )
}

export default App