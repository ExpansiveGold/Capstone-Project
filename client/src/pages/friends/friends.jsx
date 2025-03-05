import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/navbar";
import axios from "axios";

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
        axios.post(`/profile/user/${id}/friends/add/${friendId}`)
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
            <form key={friends[i]._id}>
                <p>{friends[i].username}</p>
                <input type="button" value="Remove" onClick={() => RemoveFriend(friends[i]._id)} />
            </form>
        )
    }

    return(
        <>
            <h1>Friends</h1>
            <Nav id={id}/>
            <div>
                <p>{message}</p>
                <form>
                    <input 
                        type="text" 
                        value={friendId} 
                        id="add" 
                        onChange={(e)=>{setFriendId(e.target.value)}}
                    />
                    <input type="button" value="Add" onClick={AddFriend} />
                </form>
                { friendList }
            </div>
        </>
    )
}