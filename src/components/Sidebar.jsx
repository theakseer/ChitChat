import React, { useContext } from 'react'
// import { Navbar } from '../components/Navbar'
import { Searchbar } from '../components/Searchbar'
import { Chats } from '../components/Chats'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import logo from './../images/logo.png'


export const Sidebar = () => {
    const { currentUser } = useContext(AuthContext)

    return (
        <div className='sidebar'>
            <div className='navbar'>
                <span className="logo"><img src={logo} style={{width:"24px"}} alt="" /> Chit Chat</span>
                <div className="user">
                    <img src={currentUser.photoURL} alt="" />
                    <span >{currentUser.displayName}</span>
                    <button onClick={() => signOut(auth)} className='logout' >Log out</button>
                </div>
            </div>
            <Searchbar />
            <Chats />
        </div>
    )
}
