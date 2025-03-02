import { useState } from 'react'
import { useNavigate } from "react-router-dom";
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
        <>
            <h1>Login</h1>
            <p>{message}</p>
            <form>
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
                    required
                />
                <input type="button" value="Login" onClick={login} />
                <p>Don't have an account? <a type="button" onClick={createAccount}>Register</a></p>
            </form>
        </>
    )
}