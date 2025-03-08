import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "../../components/navbar/navbar.jsx";
import axios from "axios";
import './history.css'

export default function History() {
    const [history, setHistory] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        axios.get(`/profile/user/${id}/history`)
        .then((res) => {
            setHistory(res.data)
            console.log(res)
        })
    }, []) 

    const watch = (matchHash) => {
        navigate(`/user/${id}/match/watch/${matchHash}`)
    }

    const games = []
    for (let i = 0; i < history.length; i++ ) {

        if (id == history[i].white) {
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
                    <p className="button" onClick={() => watch(history[i].hash)}>Watch</p>
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
            <Nav id={id} />
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