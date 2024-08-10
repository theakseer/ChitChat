import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase'

export const Navbar = () => {
    const { currentUser } = useContext(AuthContext)

    return (
        <div className='navbar'>
            <span className="logo">Talkify</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span >{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)} className='logout'>Log out</button>
            </div>
        </div>
    )
}
