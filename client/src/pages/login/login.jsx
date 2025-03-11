import { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../components/AuthContext';
import axios from "axios";
import './login.css'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const { token, setToken } = useContext(AuthContext)

    const navigate = useNavigate()

    
    useEffect(() => {
        console.log(token)
        if (token !== null) {
        // if (!token) {
            navigate('/home')
        }
    })

    const login = async () => {
        await axios.post('/login', {
            email: email,
            password: password
        })
        .then((res) => {
            if (res.data.message === 'success') {
                setToken(res.data.token)
                localStorage.setItem('token', res.data.token)
                // navigate(`/home/user/${user._id}`)        
                navigate(`/home`)        
            } 
        })
        .catch((res) => {
            console.log('Auth failed: ',res)
            setToken(null)
            localStorage.removeItem('token')
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