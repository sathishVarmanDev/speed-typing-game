import React, { useState } from "react"

// all caps because its a time constant that we want to be consistent across the code
// set default value of STARTING_TIME to 3
const useWordGame = (STARTING_TIME = 3) => {

    //the current prop inside the textareaRef object is initially set to null
    const textareaRef = React.useRef(null)

    // Create a text state & setText setter function
    const [text, setText] = React.useState("")

    // textCount state stores the number of text/word in input box
    const [textCount, setTextCount] = React.useState(0)

    // initializes "isDisabledButton" state to false. This will be used for our start-button
    const [isDisabledButton, setIsDisabledButton] = React.useState(false)

    // initializes "isDisabledTextarea" state to true. This will be used for our textarea
    const [isDisabledTextarea, setIsDisabledTextarea] = React.useState(true)

    // handleOnChangeText takes in "event" & updates the "text" state to "event.target.value"
    const handleOnChangeText = (event) => (
        setText(event.target.value)
    )

    // count number of words in the "text" state
    const wordCount = (text) => {
        console.log("wordCount executed");
        // .trim() removes any whitespace characters from both the beginning and the end of the text string
        // .split() splits the words inside "text" via the ' ' symbol
        const textArr = text.trim().split(' ')
        // creates an array where there must be at least one letter for each text in an array
        // Then returns the length of that array
        const filteredtTextArr = textArr.filter(word => word !== '').length
        return filteredtTextArr
    }


    // isStart state returns true or false to indicate if "timer" should decrease
    const [isStart, setIsStart] = React.useState(false)

    // updates "isStart" state  either to true
    const startGame = () => {
        setIsStart(true)
        setTimer(STARTING_TIME)
        setText("")
        setTextCount(0)
        // sets the button to be disabled
        setIsDisabledButton(true)
        // sets the textarea to not be disabled
        setIsDisabledTextarea(false)
        // console.log(textareaRef.current);
    }
    // console.log(`startGame executed`, `current isStart: ${isStart}`);

    // ends game when "timer" state gets to 0
    const endGame = (text) => {
        // setting isStart state to false
        setIsStart(false)

        // Call "wordCount(text)" and pass the current "text" state
        // "wordCount(text)" returns filteredtTxtArr
        // setTextCount() will update the "textCount" state via wordCount(text)
        setTextCount(wordCount(text))
        // sets the button to be not disabled
        setIsDisabledButton(false)
        // sets the textarea to be disabled
        setIsDisabledTextarea(true)
    }

    // "timer" states holds the time remaining in the game
    const [timer, setTimer] = React.useState(STARTING_TIME)

    /**
     * When "timer" is more than 0, decrease the "timer" value by 1 every 1 second.
     * The decrement is achieved via the setTimeout high order function
     * When timer = 0, dont decrease it anymore
     * Thus, the dependancy, for this useEffect() is the "timer" state
     */
    React.useEffect(() => {
        if (timer > 0 && isStart === true) {
            //  store the identifier of the setTimeout in a variable called timeoutId
            const timeoutId = setTimeout(() => {
                setTimer(prevTimer => prevTimer - 1)
            }, 1000)

            // return a function that calls clearTimeout with timeoutId as the argument. This function will be called when the component unmounts or when the dependencies
            return () => {
                clearTimeout(timeoutId);
            };
        } else if (timer === 0) {
            endGame(text)
        }
        /**
         * There are two dependancies, "timer" & "isStart". 
         * React.useEffect() will run when either "timer" or "isStart" changes in value
         * When page loads for the first time, the both "timer & isStart" states are not changed, thus React.useEffect() will not run
         * When "start-button" is clicked, the "isStart" state changes, hence running the React.useEffect()
         */
    }, [timer, isStart])

    /**
     * Set focus on the textarea when the isDisabledTextarea state changes
     * Ensures that the focus is set on the textarea after the isDisabledTextarea state has been updated.
     * The useEffect hook will run when the isDisabledTextarea state changes, so it will be executed after the setIsDisabledTextarea(false) call in the startGame function
     */

    React.useEffect(() => {
        /**
         * Check if isDisabledTextarea is false. 
         * If the condition is false (i.e., the textarea is enabled), it sets focus on the textarea element using the ref. 
         * If the condition is true, it does nothing (returns null)
         */
        isDisabledTextarea ? null : textareaRef.current.focus()
    }, [isDisabledTextarea])

    return { text, handleOnChangeText, isDisabledTextarea, textareaRef, timer, startGame, isDisabledButton, textCount }
}

export default useWordGame