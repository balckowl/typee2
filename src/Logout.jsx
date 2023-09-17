import React from 'react'
import { auth } from '../api/firebase'

const Logout = () => {
  return (
    <button onClick={() => auth.signOut()}>ログアウト</button>
  )
}

export default Logout