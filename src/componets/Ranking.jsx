import React from 'react'
import SSRank from '../assets/ssRank.png'
import SRank from '../assets/sRank.png'
import ARank from '../assets/aRank.png'
import BRank from '../assets/bRank.png'
import CRank from '../assets/cRank.png'
import Crown from '../assets/Crown.png'


const Ranking = ({ users }) => {

    return (
        <div className="col-lg-12 Ranking">
            <div className='p-3 shadow'>
                <div className='d-flex align-items-center ranking_header'>
                    <div className='ranking_header_icon'>
                        <img src={Crown} alt="" />
                    </div>
                    <h3>Ranking</h3>
                </div>
                <ul className="ranking_list">
                    {users && users.map((user, key) =>
                        <li key={key} className='row g-2'>
                            <div className="col-lg-1 col-sm-1 text-center">{key + 1}</div>
                            <div className='col-lg-1 col-sm-1 text-center'>
                                {user.highscore > 10 ? (user.highscore > 50 ? (user.highscore > 100 ? (user.highscore > 140 ?
                                    <img src={SSRank} alt="" className='scoreBatch' />:
                                    <img src={SRank} alt="" className='scoreBatch' /> ):
                                    <img src={ARank} alt="" className='scoreBatch' />) :
                                    <img src={BRank} alt="" className='scoreBatch' />) :
                                    <img src={CRank} alt="" className='scoreBatch' />
                                }
                            </div>
                            <div className='col-lg-2 col-sm-3 text-center'>{user.name}</div>
                            <div className='col-lg-1 col-sm-1 text-center'>{user.highscore}</div>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default Ranking