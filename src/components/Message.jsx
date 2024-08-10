import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { format, isThisWeek, isThisYear, isToday, isYesterday } from 'date-fns'

export const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    // console.log(message)
    const ref = useRef()
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message])
    const date = message.date.toDate();

    let formattedDate;

    if (isToday(date)) {
        formattedDate = format(date, 'p'); // Today: Time only, e.g., '4:48 PM'
    } else if (isYesterday(date)) {
        formattedDate = `Yesterday, ${format(date, 'p')}`; // Yesterday: 'Yesterday, 4:48 PM'
    } else if (isThisWeek(date)) {
        formattedDate = `${format(date, 'EEEE, p')}`; // Same week: Day of the week, e.g., 'Wednesday, 4:48 PM'
    } else if (isThisYear(date)) {
        formattedDate = format(date, 'MMM d, p'); // Same year: Month day, e.g., 'Aug 7, 4:48 PM'
    } else {
        formattedDate = format(date, 'MMM d, yyyy, p'); // Different year: Full date, e.g., 'Aug 7, 2023, 4:48 PM'
    }


    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
            <div className="messageInfo">
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
                <span>{formattedDate}</span>
            </div>
        </div>
    )
}
