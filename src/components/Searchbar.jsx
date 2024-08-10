import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';



export const Searchbar = () => {
    const [username, setUsername] = useState('')
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)
    const { currentUser } = useContext(AuthContext)

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where('displayName', '==', username))

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
            console.log(querySnapshot)
        } catch (error) {
            console.log(error)
            setErr(true)
        }

    }

    const handleKey = e => {
        e.code === 'Enter' && handleSearch();
    }
    const handleSelect = async () => {
        //check whether chat folder exists or not in firestore if not create a new one
        const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
        try {
            const res = await getDoc(doc(db, "chats", combinedID))
            if (!res.exists()) {
                //create chat in chats collection
                await setDoc(doc(db, 'chats', combinedID), { messages: [] })

                //create a user chat
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedID + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedID + '.date']: serverTimestamp()
                })

                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedID + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedID + '.date']: serverTimestamp()
                })
            }
        } catch (error) {

        }
        setUser(null);
        setUsername('');
        // if (window.innerWidth < 480) document.getElementsByClassName('.sidebar')[0].style.display = 'none'

    }
    return (
        <div className='search'>
            <div className="searchForm">
                <input type="text"
                    value={username} placeholder='find a user' onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} />
            </div>
            {err && <span>User not found..!</span>}
            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>

    )
}
