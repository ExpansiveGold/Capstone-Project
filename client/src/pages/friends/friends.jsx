import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext.js";
import Nav from "../../components/navbar/navbar.jsx";
import axios from "axios";
import './friends.css'

export default function Home() {
    const [friends, setFriends] = useState([])
    const [friendId, setFriendId] = useState("")
    const [message, setMessage] = useState("");
    const { token, loading } = useContext(AuthContext);

    useEffect(() => {
        if (loading === true) {
            // return null;
            return;
        } else if (token === null) {
            return <Navigate to="/login" replace />;
            // navigate('/login')
        } else {
            axios.post(`/auth/user/friends`, {
                token: token
            })
            .then((res) => {
                // sort friend list before storing
                setFriends(res.data.friends.sort((a, b) => a.username.localeCompare(b.username)));
                console.log(res, friends)
            })
        }

    }, [message])

    // function AddFriend(friendId) {
    const AddFriend = () => {
        setMessage("")
        axios.post(`/auth/user/friends/add/${friendId}`, {
            token: token
        })
        .then((res) => {
            console.log(res, !res.data.message)
            if (!res.data.message) {
                setMessage('Friend added')
            }
        })
        .catch((res) => {
            console.log(res)
            // setMessage('User not found')
            setMessage(res.response.data.message)
        })
    }

    // function RemoveFriend(friend) {
    const RemoveFriend = (friend) => {
        setMessage("")
        axios.post(`/auth/user/friends/remove/${friend}`, {
            token: token
        })
        .then((res) => {
            console.log(res, !res.data.message)
            if (!res.data.message) {
                setMessage('Friend removed')
            }
        })
    }

    const friendList = []
    for (let i = 0; i < friends.length; i++ ) {
        friendList.push(   
            <form className="friend-list" key={friends[i]._id}>
                <p>{friends[i].username}</p>
                <p className="button" onClick={() => RemoveFriend(friends[i]._id)}>Remove</p>
            </form>
        )
    }

    return(
        <div className="friends">
            {/* <h1>Friends</h1> */}
            <Nav />
            <div className="center">
                <div className="form-friends"> 
                    <h1 className="center-text" style={message === '' ? {marginBottom: '5.3%'} : {marginBottom: '2%'}}>Friends</h1>
                    <div className="mb-10">
                        <p className="center-text mb-10">{message}</p>
                        <form className="addFriend">
                            <input 
                                className="input-friend"
                                type="text" 
                                value={friendId} 
                                id="add" 
                                onChange={(e)=>{setFriendId(e.target.value)}}
                                placeholder="Type your friends email address"
                            />
                            {/* <input type="button" value="Add" onClick={AddFriend} /> */}
                            <p className="button" onClick={AddFriend}>Add</p>
                        </form>
                    </div>
                    <div className="scroll">
                        { friendList }
                    </div>
                </div>
            </div>
        </div>
    )
}