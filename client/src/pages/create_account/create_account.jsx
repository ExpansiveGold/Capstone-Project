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
                login()
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
        navigate("/Login")
    }

    return(
        <>
            <h1>Create Account</h1>
            <p>{message}</p>
            <form>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    value={username}
                    id='username'
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="email">Email:</label>
                <input 
                    type="text" 
                    value={email}
                    id='email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="text" 
                    value={password}
                    id='password'
                    onChange={(e) => setPassword(e.target.value)}
                    
                />
                <input type="button" value="Login" onClick={createAccount} />
                <p>Have an account? <a type="button" onClick={login}>Login</a></p>
                
            </form>
        </>
    )
}