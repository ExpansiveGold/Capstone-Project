import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useParams } from "react-router-dom";
import './home.css'
import Nav from "../../components/navbar/navbar.jsx";
import axios from "axios";

export default function Home() {
    const [friends, setFriends] = useState([])
    const { id } = useParams()

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
                <div className="form-home"> 
                    <div className="scroll">
                        { friendList }
                    </div>
                </div>
            </div>
        </div>
    )
}