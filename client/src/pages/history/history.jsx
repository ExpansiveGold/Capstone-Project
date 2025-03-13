import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Nav from "../../components/navbar/navbar.jsx";
import { AuthContext } from "../../components/AuthContext.js";
import axios from "axios";
import './history.css'

export default function History() {
    const [user, setUser] = useState({})
    const [history, setHistory] = useState({})
    const { token, loading } = useContext(AuthContext);
    const navigate = useNavigate()

    const checkToken = () => {
        if (loading === true) {
            // return null;
            return false;
        } else if (token === null) {
            // return <Navigate to="/login" replace />;
            // navigate('/login')
        } else {
            return true
        }
    }
    
    useEffect(() => {
        if (checkToken()) {
            axios.post(`/auth/user/history`, {
                token: token
            })
            .then((res) => {
                setUser(res.data.user)
                setHistory(res.data.matches)
                console.log(res)
            })
        }
    }, []) 

    const watch = (matchHash) => {
        console.log(matchHash)
        navigate(`/user/watch/${matchHash}`)
    }

    const games = []
    for (let i = 0; i < history.length; i++ ) {

        if (user.id == history[i].white) {
            games.push(
                <form className="match-list" key={history[i]._id}>
                    <div className="player">
                        <div className="white-block"></div>
                        <p>{history[i].whitePlayer}</p>
                    </div>
                    <p>Vs.</p>
                    <div className="player">
                        <div className="black-block"></div>
                        <p>{history[i].blackPlayer}</p>
                    </div>
                    {/* <input type="button" value="Watch" onClick={() => watch(history[i].hash)} /> */}
                    <p className="button" onClick={() => watch(history[i].hash.replace(/\//g, "slash"))}>Watch</p>
                </form>
            )
        } else {
            games.push(
                <form className="match-list" key={history[i]._id}>
                    <div className="player">
                        <div className="black-block"></div>
                        <p>{history[i].blackPlayer}</p>
                    </div>
                    <p>Vs.</p>
                    <div className="player">
                        <div className="white-block"></div>
                        <p>{history[i].whitePlayer}</p>
                    </div>
                    {/* <input type="button" value="Watch" onClick={() => watch(history[i].hash)} /> */}
                    <p className="button" onClick={() => watch(history[i].hash)}>Watch</p>
                </form>
            )
        }
    }

    return(
        <div className="history">
            {/* <h1>History</h1> */}
            <Nav />
            <div className="center">
                <div className="form-history">
                    <h1 className="center-text mb-10">Match History</h1>
                    <div className="scroll">
                        {games}
                    </div>
                </div>
            </div>
        </div>
    )
}