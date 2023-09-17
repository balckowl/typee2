import React, { useContext, useEffect, useState } from 'react'
import Header from './componets/Header'
import RaderChart from './componets/RaderChart'
import { auth, db } from '../api/firebase'
import { AuthContext } from './Context/AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import Footer from './componets/Footer'
import SSRank from '../src/assets/ssRank.png'
import SRank from '../src/assets/sRank.png'
import ARank from '../src/assets/aRank.png'
import BRank from '../src/assets/bRank.png'
import CRank from '../src/assets/cRank.png'

const Mypage = () => {

    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);

    const getUserInfo = async () => {
        if (user) {
            const { uid } = auth.currentUser;
            const userDocRef = doc(db, 'users', uid);

            try {
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    setUserInfo(userDocSnap.data());
                }
            } catch (error) {
                console.error('ユーザーデータの取得中にエラーが発生しました', error);
            }
        }

    }

    //ユーザー情報を取得
    useEffect(() => {
        getUserInfo();
        console.log('Yes')
    }, [user])

    return (
        <div>
            <Header />
            <main>
                <div className="container">
                    <div className="shadow p-3">
                        <h1>My PAGE</h1>
                        <div className="row">
                            <div className="col-7">
                                {userInfo && <RaderChart userInfo={userInfo} />}
                            </div>
                            <div className="col-5">
                                <div className='mypage_header d-flex align-items-center'>
                                    <div className='mypage_header_rank me-2'>
                                        {userInfo && userInfo.highscore >= 10 ? (userInfo.highscore >= 50 ? (userInfo.highscore >= 100 ? (userInfo.highscore >= 140 ?
                                            <img src={SSRank} alt="" className='scoreBatch' /> :
                                            <img src={SRank} alt="" className='scoreBatch' />) :
                                            <img src={ARank} alt="" className='scoreBatch' />) :
                                            <img src={BRank} alt="" className='scoreBatch' />) :
                                            <img src={CRank} alt="" className='scoreBatch' />
                                        }
                                    </div>
                                    <h2>{user && user.displayName}</h2>
                                </div>
                                <div className='mb-3'>
                                    {user && <img src={user.photoURL} alt="" />}
                                </div>
                                <ul className='mypage_content'>
                                    <li>HighScore : {userInfo && userInfo.highscore}</li>
                                    <li>Point : {userInfo && userInfo.point}</li>
                                    <li>Miss : {userInfo && userInfo.miss}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Mypage