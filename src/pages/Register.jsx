import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


export const Register = () => {
    const [err, setErr] = useState(false)
    const navigate= useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const profilePicUrl = `https://avatar.iran.liara.run/public/boy?username=${displayName}`
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(res.user, {
                displayName, photoURL: profilePicUrl
            });

            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                timeStamp: new Date().toLocaleString(),
                email,
                password,
                photoURL: profilePicUrl
            });
            await setDoc(doc(db, 'userChats', res.user.uid,), { });
            navigate('/')
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
                    <button>Sign Up</button>
                    {(err && <span>Something went wrong..!</span>)}
                </form>
                <p>You do have an accout? <Link to='/login'>Log in</Link> </p>
            </div>
        </div>
    )
}
