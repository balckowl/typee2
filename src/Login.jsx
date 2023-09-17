import React from 'react'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../api/firebase'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
        navigate('/');
    }

    return (
        <div className='Login'>
            <div className='hero d-flex justify-content-center align-items-center flex-column'>
                <h1 className='title'>Typee2</h1>
                <button onClick={signInWithGoogle}>ログイン</button>
            </div>
            <div className="login_footer">
                <div className="copyright">
                    <p>&copy; 2023 All reserved Typee2</p>
                </div>
            </div>
        </div>
    )
}

export default Login