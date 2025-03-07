import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './login.css'
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate()

    const login = async () => {
        await axios.post('/login', {
            email: email,
            password: password
        })
        .then((res) => {
            if (res.data.isBanned) {
                setMessage('This user is banned')
                return
            }
            console.log(res, !res.data.message)
            if (!res.data.message) {
                navigate(`/home/user/${res.data._id}`)        
            } 
        })
        .catch((res) => {
            console.log(res.response.data.message)
            setMessage(res.response.data.message)
        })
    }

    const createAccount = () => {
        navigate("/create_account")
    }

    return(
        <div className='center center-text'>
            <form className='form'>
                <h1 className='title' style={message === '' ? {marginBottom: '5%'} : {marginBottom: '2%'}}>Login</h1>
                <p className='message'>{message}</p>
                <div className='input'>
                    <label htmlFor="email">Email:</label>
                    <input 
                        className='input-box'
                        type="text" 
                        value={email}
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='input'>
                    <label htmlFor="password">Password:</label>
                    <input 
                        className='input-box mb-10'
                        type="text" 
                        value={password}
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <p className='button mb-10'onClick={login}>Login</p>
                <p>Don't have an account? <a type="button" className='nav' onClick={createAccount}>Register</a></p>
            </form>
        </div>
    )
}