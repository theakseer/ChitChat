import React from 'react'
import { Chat } from '../components/Chat'
import { Sidebar } from '../components/Sidebar'
export const Home = () => {
    return (
        <div className='Home'>
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
            <div className="footer"> by akseerlabs</div>
        </div>
    )
}

