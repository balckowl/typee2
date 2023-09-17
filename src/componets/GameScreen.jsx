import React, { useState, useEffect } from 'react'
import Game from './Game'
import StartGame from './StartGame'
import GameOver from './GameOver';
import Check from '../assets/check.png'
import Timer from '../assets/timer.png'
import Cross from '../assets/cross.png'
import SSRank from '../assets/ssRank.png'
import SRank from '../assets/sRank.png'
import ARank from '../assets/aRank.png'
import BRank from '../assets/bRank.png'
import CRank from '../assets/cRank.png'

const GameScreen = ({ words, loading, setUserHighscore }) => {
    const [isStart, setIsStart] = useState(false);
    let [missNumber, setMissNumber] = useState(0);
    let [point, setPoint] = useState(0);
    let [score, setScore] = useState(0);
    const [timer, setTimer] = useState(20);

    //タイマ-
    useEffect(() => {
        let countdown;

        if (isStart && timer > 0) {
            countdown = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0) {
            // タイマーが0になったときの処理
            clearInterval(countdown);
        }

        return () => clearInterval(countdown);
    }, [timer, isStart]);

    const isGameRestart = () => {
        setIsStart(false);
        setTimer(20);
        setMissNumber(0);
        setPoint(0);
        setScore(0);
    }

    return (
        <>
            <div className="col-lg-2">
                <div className='shadow d-flex align-items-center p-2'>
                    <div className="gameScreen_icon pe-2">
                        <img src={Check} alt="" />
                    </div>
                    <p>クリア数: {point}</p>
                </div>
            </div>
            <div className="col-lg-2">
                <div className='shadow d-flex align-items-center p-2'>
                    <div className="gameScreen_icon pe-2">
                        <img src={Cross} alt="" />
                    </div>
                    <p>ミス数: {missNumber}</p>
                </div>
            </div>
            <div className="col-lg-2">
                <div className="shadow d-flex align-items-center p-2">
                    <div className="gameScreen_icon pe-2">
                        <img src={Timer} alt="" />
                    </div>
                    <p>タイム: {timer}</p>
                </div>
            </div>
            <div className="col-lg-2">
                <div className="shadow d-flex align-items-center p-2">
                    <div className="gameScreen_icon pe-2">
                        {score > 10 ? (score > 50 ? (score > 100 ? (score > 140 ?
                            <img src={SSRank} alt="" className='scoreBatch' />:
                            <img src={SRank} alt="" className='scoreBatch' /> ):
                            <img src={ARank} alt="" className='scoreBatch' />) :
                            <img src={BRank} alt="" className='scoreBatch' />) :
                            <img src={CRank} alt="" className='scoreBatch' />
                        }
                    </div>
                    <p>スコア: {score}</p>
                </div>
            </div>
            <div className="col-lg-8">
                <div className='shadow gameScreen d-flex justify-content-center align-items-center'>
                    {loading ? (isStart ? (timer > 0 ? <Game words={words} setMissNumber={setMissNumber} missNumber={missNumber} setPoint={setPoint} point={point} setScore={setScore} /> : <GameOver isGameRestart={isGameRestart} score={score} setUserHighscore={setUserHighscore} missNumber={missNumber} point={point}/>) : <StartGame setIsStart={setIsStart} />) : <h1>Loading...</h1>}
                </div>
            </div>
        </>
    )
}

export default GameScreen