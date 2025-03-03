import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../../components/navbar";
import axios from "axios";

export default function Profile() {
    const [user, setUser] = useState({})
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [message, setMessage] = useState('')
    const [delMsg, setDelMsg] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/profile/user/${id}`)
        .then((res) => {
            setUser(res.data)
            console.log(res)
        })
    }, []) 

    const changePass = () => {
        axios.post(`/profile/user/${id}/change_password`, {
            password: password,
            newPassword: newPassword
        })
        .then((res) => {
            console.log(res, !res.data.message)
            if (!res.data.message) {
                setMessage('Password changed')
            }
        })
        .catch((res) => {
            console.log(res)
            // setMessage('User not found')
            setMessage(res.response.data.message)
        })
    }

    const delAccount = () => {
        axios.delete(`/profile/user/${id}/delete_account`, {
            password: password
        })
        .then((res) => {
            console.log(res, !res.data.message)
            if (!res.data.message) {
                navigate('/login')
            }
        })
        .catch((res) => {
            console.log(res)
            // setMessage('User not found')
            setDelMsg(res.response.data.message)
        })
    }

    return(
        <>
            <h1>Profile</h1>
            <Nav id={id} />
            <div>
                <h1>User data</h1>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <hr />
                <form>
                    <h2>Change Password</h2>
                    <p>{message}</p>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="text" 
                        value={password}
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="newPassword">New Password:</label>
                    <input 
                        type="text" 
                        value={newPassword}
                        id='newPassword'
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input type="button" value="Change Password" onClick={changePass} />
                </form>
                <hr />
                <form>
                    <h2>Delete account</h2>
                    <p>{delMsg}</p>
                    <label htmlFor="password">Please enter your password:</label>
                    <input 
                        type="text" 
                        value={passwordCheck}
                        id='password'
                        onChange={(e) => setPasswordCheck(e.target.value)}
                        required
                    />
                    <input type="button" value="Delete account" onClick={delAccount} />
                </form>
                <hr />
                <h2>Log out</h2>
                <input type="button" value="Log out" onClick={()=> navigate('/login')} />
            </div>
        </>
    )
}