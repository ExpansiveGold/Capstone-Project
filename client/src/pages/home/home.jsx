import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useParams } from "react-router-dom";
import Nav from "../../components/navbar";
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
            <div key={friends[i]._id}>
                <p>{friends[i].username}</p>
                <input type="button" value='invite' onClick={invite} />
            </div>
        )
    }

    return(
        <>
            <h1>Home</h1>
            <Nav id={id}/>
            <Chessboard 
                position={'start'}
                arePiecesDraggable={false}
                boardWidth={560}
            />
            <div>
                { friendList }
            </div>
            {/* 
                +--------+---------------------------+
                | navbar | +-------------+---------+ |
                |        | | board       | friends | |
                |        | | -fixed      |   to    | |
                |        | |             |  play   | |
                |        | |             |         | |
                |        | |             |         | |
                |        | +-------------+---------+ |
                +--------+---------------------------+ 
            */}
        </>
    )
}