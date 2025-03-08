import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/navbar/navbar.jsx"
import Popup from 'reactjs-popup';
import axios from "axios";
import './admin.css'

export default function Admin(){
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')
    const { id } = useParams()
    
    useEffect(() => {
        axios.get('/admin/users')
        .then((res) => {
            setUsers(res.data.sort((a, b) => a.username.localeCompare(b.username)))
        })
    }, [message])

    const delAccount = (id) => {
        setMessage('')
        axios.delete(`/admin/users/delete/${id}`)
        .then((res) => {
            setMessage('')
            console.log(res, !res.data.message)
            setMessage(res.data.message)
        })
        .catch((res) => {
            console.log(res)
            setMessage('An unexpected error occured')
        })
    }

    const admin = (id, state) => {
        setMessage('')
        axios.post(`/admin/users/edit/${id}`, {
            isAdmin: !state
        })
        .then(() => {
            setMessage('Admin permissions changed')
        })
    }

    const ban = (id, state) => {
        setMessage('')
        axios.post(`/admin/users/edit/${id}`, {
            isBanned: !state
        })
        .then(() => {
            setMessage('User permissions changed')
        })
    }

    const userList = []
    for (let i = 0; i < users.length; i++) {
        if (users[i]._id == id) continue
        userList.push(   
            <div className="user-list" key={users[i]._id}>
                <p>{users[i].username}</p>
                <p>{users[i].email}</p>
                <Popup trigger={<p className="button">Edit</p>} modal nested>
                    {close => (
                        <div className="popup">
                            <h1 className='center-text mb-10' style={message === '' ? {marginBottom: '7.5%'} : {marginBottom: '2%'}}>Permissions</h1>
                            <p className="center-text mb-10">{ message }</p>
                            <div className="permissions">
                                <p className="perBtn hv-text-center">Change admin permissions</p>
                                <p className="buttonDel perBtn center-text" onClick={() => {admin(users[i]._id, users[i].isAdmin)}}>{users[i].isAdmin ? 'Revoke' : 'Give'}</p>
                            </div>
                            <div className="permissions">
                                <p className="perBtn hv-text-center">Change account status</p>
                                <p className="buttonDel perBtn center-text" onClick={() => {ban(users[i]._id, users[i].isBanned)}}>{users[i].isBanned ? 'Unban' : 'Ban'}</p>
                            </div>
                            <div className="buttons">
                                <p className="buttonForm perBtn center-text" onClick={close}>Cancel</p>
                                <Popup trigger={<p className="buttonDel perBtn center-text">Delete Account</p>} modal nested>
                                    {close2 => (
                                        <div>
                                            <h1 className="center-text mb-10 title">Atention!</h1>
                                            <p className="center-text mb-10">This action is not reversable. Are you sure you want to procede?</p>
                                            <div className="buttons">
                                                <p className="buttonForm perBtn center-text" onClick={close2}>Cancel</p>
                                                <p className="buttonDel perBtn center-text" onClick={() => {delAccount(users[i]._id);close()}}>Delete account</p>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        )
    }

    return(
        <div className="admin">
            {/* <h1>Admin</h1> */}
            <Nav id={id} />
            <div className="center">
                <div className="form-users">
                    <h1 className="center-text" style={message === '' ? {marginBottom: '5.3%'} : {marginBottom: '2%'}}>Users</h1>
                    <p className="mb-10 center-text">{ message }</p>
                    <div className="scroll">
                        { userList }
                    </div>
                </div>
            </div>
        </div>
    )
}