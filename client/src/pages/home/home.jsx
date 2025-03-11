import { useEffect, useState, useContext } from "react";
import { Chessboard } from "react-chessboard";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext.js";
// import jwt from 'jsonwebtoken'
import Nav from "../../components/navbar/navbar.jsx";
import axios from "axios";
import './home.css'
// import { verifyToken } from "../../../../server/utils/jwtHelper.js";

export default function Home() {
    // const [user, setUser] = useState({})
    const [friends, setFriends] = useState([])
    const { token, loading } = useContext(AuthContext);
    const navigate = useNavigate()

    const checkToken = () => {
        if (loading === true) {
            // return null;
            return false;
        } else if (token === null) {
            // return <Navigate to="/login" replace />;
            navigate('/login')
        } else {
            return true
        }
    }
    
    useEffect(() => {
        console.log(token)
        if (checkToken()) {
            axios.post(`/auth/user/friends`, {
                token: token
            })
            .then((res) => {
                setFriends(res.data.friends)
                console.log(res)
            })
        }
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
    // console.log(friendList)
    const friend = () => {
        navigate(`/auth/user/friends`)
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
            <Nav />
            <div className="main">
                <div>
                    <Chessboard 
                        position={'start'}
                        arePiecesDraggable={false}
                        boardWidth={580}
                        customBoardStyle={{borderRadius: '3px', border: '1px'}}
                    />
                </div>
                <div className="form-home friendSec"> 
                    <h1 className="center-text mb-10">Friends</h1>
                    <div className="scroll">
                        { friendList.length === 0 ? addFriends : friendList }
                        {/* { friendList } */}
                    </div>
                </div>
            </div>
        </div>
    )
}