import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useNavigate, useParams } from "react-router-dom";
import './home.css'
import Nav from "../../components/navbar/navbar.jsx";
import axios from "axios";

export default function Home() {
    const [friends, setFriends] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/profile/user/${id}/friends`)
        .then((res) => {
            setFriends(res.data)
            console.log(res)
        })
    }, [])

    const invite = () => {
        console.log(friends)
    }

    const friendList = []
    for (let i = 0; i < friends.length; i++ ) {
        friendList.push(   
            <div className="friend" key={friends[i]._id}>
                <p>{friends[i].username}</p>
                <p className="button" onClick={invite}>Invite</p>
            </div>
        )
    }
    console.log(friendList)
    const friend = () => {
        navigate(`/profile/user/${id}/friends`)
    }

    const addFriends = [
        <div className="friend">
            <p>Start by adding some friends</p>
            <p className="button" onClick={friend}>Add</p>
        </div>
    ]

    return(
        <div className="home">
            {/* <h1>Home</h1> */}
            <Nav id={id}/>
            <div className="main">
                <div>
                    <Chessboard 
                        position={'start'}
                        arePiecesDraggable={false}
                        boardWidth={680}
                        customBoardStyle={{borderRadius: '3px', border: '1px'}}
                    />
                </div>
                <div className="form-home friendSec"> 
                    <h1 className="center-text mb-10">Friends</h1>
                    <div className="scroll">
                        {friendList.length === 0 ? addFriends : friendList }
                        {/* { friendList } */}
                    </div>
                </div>
            </div>
        </div>
    )
}