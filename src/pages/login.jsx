import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {  useNavigate , Link} from 'react-router-dom';
import { auth } from '../firebase';

export const Login = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        try {

            signInWithEmailAndPassword(auth, email, password)
              navigate('/')
        } catch (error) {
            setErr(true)
        }

    }

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className="logo">Chit Chat</span>
                <span className="title">Welcome!</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" name=""  placeholder='email' />
                    <input type="password" name=""  placeholder='password' />
                    <button >{ "Sign In"}</button>
                    {err && <span>Something went wrong..!</span> }
                </form>
                <p>You do not have an accout? <Link to='/register'>Sign up</Link> </p>
            </div>
        </div>
    )
}

