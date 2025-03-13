import { useEffect, useState, useContext } from "react";
import { Chessboard } from "react-chessboard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext.js";
import { socket } from "../../socket.js";
import Popup from 'reactjs-popup';
import Nav from "../../components/navbar/navbar.jsx";
import axios from "axios";
import './home.css'

export default function Home() {
    const [user, setUser] = useState({})
    const [friends, setFriends] = useState([])
    const [popup, setPopup] = useState(null)
    const [inviteData, setInviteData] = useState(null)
    const [inviteShow, setInviteShow] = useState(false)
    const { token, loading, room, setRoom, setWhite, setBlack } = useContext(AuthContext);
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
        socket.connect()

        return () => {
            socket.disconnect()
        }

    }, [])

    useEffect(() => {
        // console.log(token)
        if (checkToken()) {
            axios.post(`/auth/user/friends`, {
                token: token
            })
            .then((res) => {
                setUser(res.data.user)
                setFriends(res.data.friends)
                console.log(res)
            })
        }
    }, [])

    useEffect(() => {
        const receive_invite = (data) => {
            console.log(data.friendId, data.user, user.id)
            // setInviteShow(true)
            // setInviteData(data)
            if (data.friendId === user.id) {
                setInviteShow(true)
                setInviteData(data)
            }
            // gameRequest(data)
            console.log(data, 'invite data')
        }
        const invite_accept = (data) => {
            console.log(data, user.id, room)
            if (data.friendId !== user.id) {
                console.log(data, 'INVITE ACCEPT')
                socket.emit('accepted', data)
                setInviteData(data)
                setRoom(`${data.user.id}${data.friend.id}`)
                setWhite(data.user)
                setBlack(data.friend)
                navigate('/user/play')
            }
        }
        const invite_refuse = () => {
            // if (data.friendId === user.id) {
                console.log('invite refused')            
            // }
        }

        socket.on('receive_invite', receive_invite)
        socket.on('invite_accept', invite_accept)
        socket.on('invite_refuse', invite_refuse)

        // Cleanup the effect by removing the event listener when the component unmounts
        return () => {
            socket.off("receive_invite", receive_invite);
            socket.off("invite_accept", invite_accept);
            socket.off("invite_refuse", invite_refuse);
        };
    // }, [inviteData, inviteShow, popup]);
    });

    useEffect(() => {
        console.log(inviteShow, inviteData)
        if (inviteShow) {
            gameRequest(inviteData)
        }
    }, [inviteShow])

    const invite = (id) => {
        const data = {
            Socket: socket.id,
            user: user,
            friendId: id,
        }
        setInviteData(data)
        socket.emit('game_invite', data)
        // console.log(friends)
    }

    const accept = () => {
        console.log(inviteData.friendId)
        socket.emit('accept', {
            Socket: inviteData.socket,
            user: inviteData.user,
            friendId: inviteData.friendId,
            friend: user
        })
        setRoom(`${inviteData.user.id}${user.id}`)
        setWhite(inviteData.user)
        setBlack(user)
        navigate('/user/play')
    }

    const reset = () => {
        setInviteShow(false)
        setInviteData(null)
        setPopup(null)
        socket.emit('refuse')
    }

    const gameRequest = (data) => {
        // if (data.friendId === user.id) {
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', inviteShow)
            setPopup(
                <Popup trigger={<p></p>} open={inviteShow} onClose={reset} modal>
                    {close => (
                        <div className="flexVertical popup">
                            <div className="mb-10">
                                <h1 className="center-text">Atention!</h1>
                                <h3 className="center-text">{data.user.username} has invited you to a match</h3>
                            </div>
                            <div className="buttons">
                                <p className="buttonDel w45 center-text" onClick={close}>Close</p>
                                <p className="buttonForm w45 center-text" onClick={accept}>Accept</p>
                            </div>
                        </div>
                    )}
                </Popup>
            )
        // }
        console.log(inviteShow, inviteData)
    }

    const friendList = []
    for (let i = 0; i < friends.length; i++ ) {
        friendList.push(   
            <div className="friend" key={friends[i]._id}>
                <p>{friends[i].username}</p>
                <p className="button" onClick={() => invite(friends[i]._id)}>Invite</p>
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
            { inviteShow === true ? popup : <div></div> }
            {/* { popup } */}
        </div>
    )
}