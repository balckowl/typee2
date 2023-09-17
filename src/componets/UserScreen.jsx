import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import UserIcon from '../assets/userIcon.png'
import SSRank from '../assets/ssRank.png'
import SRank from '../assets/sRank.png'
import ARank from '../assets/aRank.png'
import BRank from '../assets/bRank.png'
import CRank from '../assets/cRank.png'

const UserScreen = ({ userHighscore }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className="col-lg-12 UserScreen">
            <div className='shadow p-3'>
                <div className='d-flex align-items-center userIcon_header'>
                    <div className='pe-2 userIcon_header_icon'>
                        <img src={UserIcon} alt="" />
                    </div>
                    <h3>User</h3>
                </div>
                <div className='d-flex align-items-center'>
                    {user && <img src={user.photoURL} alt="" className='me-3' />}
                    <div>
                        {user && <h2>{user.displayName}</h2>}
                        <div className='d-flex align-items-center'>
                            <div className='p-2'>
                                {userHighscore >= 10 ? (userHighscore >= 50 ? (userHighscore >= 100 ? (userHighscore >= 140 ? 
                                    <img src={SSRank} alt="" className='scoreBatch' /> :
                                    <img src={SRank} alt="" className='scoreBatch' />) :
                                    <img src={ARank} alt="" className='scoreBatch' />) :
                                    <img src={BRank} alt="" className='scoreBatch' />) :
                                    <img src={CRank} alt="" className='scoreBatch' />
                                }
                            </div>
                            <p>最高得点：{userHighscore}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserScreen