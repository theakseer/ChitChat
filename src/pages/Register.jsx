import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from 'react';
import addAvatar from '../images/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


export const Register = () => {
    const [err, setErr] = useState(false)
    const [progress, setProgress] = useState(false)
    const navigate= useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, 'userImages/' + email);
            const uploadTask = uploadBytesResumable(storageRef, file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',(snapshot)=>{
                // avatar uploading progress
                // const progres = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress('Setting up things...')
  
            },
                (error) => {
                    // Handle unsuccessful uploads
                    setErr(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName, photoURL: downloadURL
                        });

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            timeStamp: new Date().toLocaleString(),
                            email,
                            password,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, 'userChats', res.user.uid,), { });
                        navigate('/')
                    });
                }
            );

        } catch (err) {
            setErr(true)
        }

    }
    
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className="logo">Chit Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit} id='form'>
                    <input type="text" placeholder='Enter name here' name="" id="name" />
                    <input type="email" name="" id="email" placeholder='email' />
                    <input type="password" name="" id="password" placeholder='password' />
                    <input style={{ display: "none", }} type="file" name="" id="file" />
                    <label htmlFor="file">
                        <img src={addAvatar}  alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {(err && <span>Something went wrong..!</span>) || (progress && <span>{progress}</span> )}
                </form>
                <p>You do have an accout? <Link to='/login'>Log in</Link> </p>
            </div>
        </div>
    )
}
