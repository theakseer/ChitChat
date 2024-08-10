import React, { useContext } from 'react'
import cam from '../images/cam.png'
import more from '../images/more.png'
import Add from '../images/Add.png'
import arrow from '../images/arrow.png'
import Messages from './Messages'
import { Input } from './Input'
import { ChatContext } from '../context/ChatContext'

export const Chat = () => {
    const { data } = useContext(ChatContext)

    const go_back = () => { document.getElementsByClassName('sidebar')[0].style.display = 'block' }

    return (
        <div className='chat'>
            <div className="chatInfo">
                <img src={arrow} className='arrow' style={{ objectFit: 'contain' }} onClick={go_back} alt="" />
                <span>{data.user.displayName}</span>
                <div className="chatIcons">
                {/* Here */}
                    <img src={cam} alt="Camera" />
                    <img src={Add} alt="Add" />
                    <img src={more} alt="More" />

                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}
