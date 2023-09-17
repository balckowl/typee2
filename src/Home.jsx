import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../api/firebase'
import { AuthContext } from './Context/AuthContext';
import GameScreen from './componets/GameScreen';
import Ranking from './componets/Ranking';
import UserScreen from './componets/UserScreen';
import { db } from '../api/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { doc, getDoc, orderBy, query } from 'firebase/firestore';
import Header from './componets/Header';
import Footer from './componets/Footer';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [words, setWords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userHighscore, setUserHighscore] = useState(0);
    const [users, setUsers] = useState(null);

    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "words"));

        const fetchedPosts = querySnapshot.docs.map((doc) => {
            return doc.data();
        });

        setWords(fetchedPosts);
        setLoading(true);
    }

    //問題データを取得
    useEffect(() => {
        getData();
    }, [])

    const getUserHighScore = async () => {
        if (auth.currentUser) {
            const { uid } = auth.currentUser;
            const userDocRef = doc(db, 'users', uid);

            try {
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    return userData.highscore || 0;
                }
            } catch (error) {
                console.error('ハイスコアの取得中にエラーが発生しました', error);
            }
        }
        return 0;
    };

    //ハイスコアを取得
    useEffect(() => {
        if (user) {
            getUserHighScore().then((highscore) => {
                setUserHighscore(highscore);
            });
        }
    }, [user]);

    const getRanking = async () => {

        const q = query(collection(db, "users"), orderBy("highscore", "desc"));
        const querySnapshot = await getDocs(q);

        const fetchedPosts = querySnapshot.docs.map((doc) => {
            return doc.data();
        });

        setUsers(fetchedPosts);
    }

    //ランキングデータを取得
    useEffect(() => {
        getRanking()
    }, [userHighscore])

    return (
        <div className='Home'>
            <Header />
            <main className='mb-4'>
                <div className="container">
                    <div className="row g-2">
                        <GameScreen words={words} loading={loading} setUserHighscore={setUserHighscore} />
                        <div className="col-lg-4">
                            <div className="row">
                                <UserScreen userHighscore={userHighscore} />
                                <div className="col-lg-12">
                                    <div className="shadow Adsense d-flex justify-content-center align-items-center">
                                        <h2>広告</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Ranking users={users} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Home