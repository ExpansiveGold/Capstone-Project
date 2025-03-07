import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateAccount() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate()

    const createAccount = () => {
        axios.post('/create_account', {
            username: username,
            email: email,
            password: password
        })
        .then((res) => {
            console.log(res, !res.data.message)
            if (!res.data.message) {
                navigate('/login')
            } 
        })
        .catch((res) => {
            console.log(res.response.data.message)
            if (res.response.data.message.slice(0, 6) == 'E11000'){
                setMessage('An account with this email already exists')
            } else {
                setMessage(res.response.data.message)
            }
        })
    }
    
    const login = () => {
        navigate("/login")
    }

    return(
        <div className='center center-text'>
            <form className='form'>
                <h1 className='title' style={message === '' ? {marginBottom: '5%'} : {marginBottom: '2%'}}>Create Account</h1>
                <p className='message'>{message}</p>
                <div className='input'>
                    <label htmlFor="username">Username:</label>
                    <input 
                        className='input-box'
                        type="text" 
                        value={username}
                        id='username'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                        
                    />
                </div>
                {/* <input type="button" value="Login" onClick={createAccount} /> */}
                <p className='button mb-10'onClick={createAccount}>Create Account</p>
                <p>Have an account? <a type="button" className='nav' onClick={login}>Login</a></p>
                
            </form>
        </div>
    )
}