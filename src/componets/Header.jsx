import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../Logout'
import { AuthContext } from '../Context/AuthContext'
import userIcon from '../assets/guestUser.png'

const Header = () => {

    const { user } = useContext(AuthContext)

    return (
        <header>
            <div className="container d-flex align-items-center justify-content-between">
                <h1>Typee2</h1>
                <nav>
                    <div className="menu">
                        <ul className="list-unstyled d-flex align-items-center gap-3">
                            <li><Link to="/">ホーム</Link></li>
                            <li><Link to="/mypage">マイページ</Link></li>
                            <li><Logout /></li>
                            <li>{user ? <img src={user.photoURL} alt="" className='userIcon' /> : <img src={userIcon} alt="" className='userIcon' />}</li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header