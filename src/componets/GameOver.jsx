import React, { useContext, useEffect } from 'react'
import { db, auth } from '../../api/firebase'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext'

const GameOver = ({ isGameRestart, score, point, missNumber, setUserHighscore }) => {

    const { user } = useContext(AuthContext)

    const sendData = async () => {

        if (user) {
            const { uid } = auth.currentUser;
            const userDocRef = doc(db, 'users', uid);

            // ユーザー文書がすでに存在するかどうかを確認
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                // 文書が存在しない場合、新しい文書を作成
                await setDoc(userDocRef, {
                    highscore: score,
                    miss: missNumber,
                    point: point,
                    name: user.displayName,
                    uid,
                });
                setUserHighscore(score);
            } else {
                // 文書が存在する場合、新しいハイスコアで文書を更新
                const userData = userDocSnap.data();
                const existingHighscore = userData.highscore;

                if (score > existingHighscore) {
                    await updateDoc(userDocRef, {
                        highscore: score,
                        miss: missNumber,
                        point: point,
                        name: user.displayName,
                        uid,
                    });
                    setUserHighscore(score);
                } else {
                    setUserHighscore(existingHighscore);
                }
            }
        }
    }

    useEffect(() => {
        sendData();
    }, []);

    return (
        <div>
            <h1 className='mb-5'>GameOver</h1>
            <div className='text-center'>
                <button onClick={isGameRestart}>もう一度</button>
            </div>
        </div>
    )
}

export default GameOver