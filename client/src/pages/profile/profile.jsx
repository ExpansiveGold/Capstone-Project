import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Nav from "../../components/navbar/navbar.jsx";
import axios from "axios";
import './profile.css'

export default function Profile() {
    const [user, setUser] = useState({})
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [message, setMessage] = useState('')
    const [delMsg, setDelMsg] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        axios.get(`/profile/user/${id}`)
        .then((res) => {
            setUser(res.data)
            console.log(res)
        })
    }, []) 

    const changePass = () => {
        setMessage('')
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
        setDelMsg('')
        axios.delete(`/profile/user/${id}/delete_account`, {
            password: passwordCheck
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
        <div className="profile">
            {/* <h1>Profile</h1> */}
            <Nav id={id} />
            <div className="center">
                <div className="form-profile">
                    <div className="align">
                        <h1 className="formItem center-text">User data</h1>
                        <div className="formItem">
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                        </div>
                    </div>
                    <hr />
                    <form className="form-section align">
                        <div className="formItem">
                            <h2 className="center-text">Change Password</h2>
                            <p className="center-text">{message}</p>
                        </div>
                        <div className="formItem">
                            <div className="input-section">
                                <label htmlFor="password">Password:</label>
                                <input 
                                    className="passInput"
                                    type="text" 
                                    value={password}
                                    id='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-section">
                                <label htmlFor="newPassword">New Password:</label>
                                <input 
                                    className="passInput"
                                    type="text" 
                                    value={newPassword}
                                    id='newPassword'
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    />
                            </div>
                            <p className="buttonForm center-text" onClick={changePass}>Change Password</p>
                        </div>
                    </form>
                    <hr />
                    <div className="align">
                        <div className="formItem">
                            <h2 className="center-text">Delete account</h2>
                            {/* <p className="center-text">{delMsg}</p> */}
                        </div>
                        <Popup trigger={<p className="buttonDel formItem center-text">Delete account</p>} modal nested>
                            {close => (
                                <div className="flexVertical">
                                    <div className="mb-10">
                                        <h1 className="center-text">Atention!</h1>
                                        <h3 className="center-text">This action is not reversable</h3>
                                    </div>
                                    <div className="flexVertical mb-10">
                                        <p className="mb-10">{delMsg}</p>
                                        <label htmlFor="password">If you still want to procede, enter your password:</label>
                                        <input 
                                            className="passInput"
                                            type="text" 
                                            value={passwordCheck}
                                            id='password'
                                            onChange={(e) => setPasswordCheck(e.target.value)}
                                        />
                                    </div>
                                    <div className="buttons">
                                        <p className="buttonForm w45 center-text" onClick={close}>Cancel</p>
                                        <p className="buttonDel w45 center-text" onClick={delAccount}>Delete account</p>
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </div>
                    <hr />
                    <div className="align">
                        <h2 className="center-text formItem">Log out</h2>
                        <p className="buttonDel center-text formItem" onClick={()=> navigate('/login')}>Log out</p>
                    </div>
                </div>
            </div>
        </div>
    )
}