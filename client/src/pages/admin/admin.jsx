import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/navbar"
import Popup from 'reactjs-popup';
import axios from "axios";

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
            <div key={users[i]._id}>
                <p>{users[i].username}</p>
                <p>{users[i].email}</p>
                <Popup trigger={<button>Edit</button>} modal nested>
                    {close => (
                        <div>
                            <p>{ message }</p>
                            <div>
                                <p>Change admin permissions</p>
                                <input type="button" value={users[i].isAdmin ? 'Revoke' : 'Give'} onClick={() => {admin(users[i]._id, users[i].isAdmin)}}/>
                            </div>
                            <div>
                                <p>Change account status</p>
                                <input type="button" value={users[i].isBanned ? 'Unban' : 'Ban'} onClick={() => {ban(users[i]._id, users[i].isBanned)}}/>
                                <Popup trigger={<button>Delete Account</button>} modal nested>
                                    <h5>Atention!</h5>
                                    <p>This action is not reversable. Are you sure you want to procede?</p>
                                    <input type="button" value="Delete account" onClick={() => {delAccount(users[i]._id);close()}} />
                                    <button className="button" onClick={close}>Cancel</button>
                                </Popup>
                                <button className="button" onClick={close}>Cancel</button>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        )
    }

    return(
        <>
            <h1>Admin</h1>
            <Nav id={id} />
            <p>{ message }</p>
            { userList }
        </>
    )
}