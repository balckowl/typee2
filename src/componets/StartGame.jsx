import React from 'react'

const StartGame = ({ setIsStart }) => {
    const handleGameStart = () =>{
        setIsStart(true);
    }

    return (
        <button onClick={handleGameStart}>StartGame</button>
    )
}

export default StartGame