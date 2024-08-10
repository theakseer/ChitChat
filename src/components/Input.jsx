import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { db, storage } from '../firebase'
import cam from '../images/cam.png'
import { v4 as uuid } from 'uuid'
import { AuthContext } from '../context/AuthContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { ChatContext } from '../context/ChatContext'



export const Input = () => {
    const [text, setText] = useState('')
    const [progress, setProgress] = useState('')
    const [img, setImg] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    
    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on('state_changed', 
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progres = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress('Sending pic...'+Math.round(progres) + '%')
            },
                (error) => {
                    // Handle unsuccessful uploads
                    // setErr(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                img: downloadURL,
                                date: Timestamp.now(),
                            }),
                        });
                    });
                }
            );
        }
        else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }
        await updateDoc(doc(db,'userChats', currentUser.uid), {
            [data.chatId + ".lastMessage"] : {
                text
            },
            [data.chatId + '.date'] : serverTimestamp()
        })
        await updateDoc(doc(db,'userChats', data.user.uid), {
            [data.chatId + ".lastMessage"] : {
                text
            },
            [data.chatId + '.date'] : serverTimestamp()
        })


        setImg(null)
        setText("")
        setProgress(0)
    }

    return (
        <div className='input'>
            <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder='Type something...' />
            <div className="send">
                {progress && <span>{progress}</span>}
                {/* <img src={more} alt="" style={{ height: '24px', width: '24px', borderRadius: '0%' }} /> */}
                <input type="file"  onChange={e => setImg(e.target.files[0])} style={{ display: 'none' }} id='file' />
                <label htmlFor="file"><img src={cam} alt="" style={{ height: '24px', width: '24px', borderRadius: '0%' }} /></label>
                <button onClick={handleSend} id='handleSend' style={{borderRadius:'10px'}}>Send</button>
            </div>
        </div>
    )
}
