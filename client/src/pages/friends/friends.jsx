import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/navbar/navbar.jsx";
import axios from "axios";
import './friends.css'

export default function Home() {
    const [friends, setFriends] = useState([])
    const [friendId, setFriendId] = useState("")
    const [message, setMessage] = useState("");
    const { id } = useParams()

    useEffect(() => {
        axios.get(`/profile/user/${id}/friends`)
        .then((res) => {
            // sort friend list before storing
            setFriends(res.data.sort((a, b) => a.username.localeCompare(b.username)));
            console.log(res, friends)
        })

    }, [message])

    // function AddFriend(friendId) {
    const AddFriend = () => {
        setMessage("")
        axios.post(`/user/${id}/friends/add/${friendId}`)
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
        axios.delete(`/profile/user/${id}/friends/remove/${friend}`)
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
            <Nav id={id}/>
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