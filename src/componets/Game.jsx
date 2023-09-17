import React, { useEffect, useState, useRef } from 'react'


const Game = ({ words, setMissNumber, setPoint, setScore, missNumber, point }) => {
    const [wordNumber, setWordNumber] = useState(0);
    const [currentNumber, setCurrentNumber] = useState(0);
    const gameContainerRef = useRef(null);
    let [wordSplit, setWordSplit] = useState(null);

    const caluclateScore = () => {
        setScore(point * 10 - missNumber)
    }

    useEffect(() => {
        caluclateScore();
    }, [point, missNumber])

    useEffect(() => {
        setWordSplit(words[wordNumber].word.split(''));
        gameContainerRef.current.focus();
    }, [wordNumber])

    const handleKeyDown = (e) => {
        if (e.key === wordSplit[currentNumber]) {
            setCurrentNumber(currentNumber + 1);

            if (currentNumber === wordSplit.length - 1) {
                setWordNumber(Math.floor(Math.random() * words.length));
                setPoint((PrevSetPoint) => PrevSetPoint + 1)
                setCurrentNumber(0);
            }

        } else {
            setMissNumber((prevMissNumber) => prevMissNumber + 1);
        }
    }

    return (
        <div>
            <div onKeyDown={(e) => handleKeyDown(e)} tabIndex={0} ref={gameContainerRef} className='game'>
                <span className='correct'>
                    {words[wordNumber].word.slice(0, currentNumber)}
                </span>
                <span className='defo'>
                    {words[wordNumber].word.slice(currentNumber, words[wordNumber].word.length)}
                </span>
            </div>
        </div>
    )
}

export default Game