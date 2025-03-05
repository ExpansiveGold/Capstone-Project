import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "../../components/navbar";
import axios from "axios";

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

         var white = (
            <form key={history[i]._id}>
                <p>{history[i].whitePlayer}</p>
                <p>Vs.</p>
                <p>{history[i].blackPlayer}</p>
                <input type="button" value="Watch" onClick={() => watch(history[i].hash)} />
            </form>
        )

        var black = (
            <form key={history[i]._id}>
                <div>
                    <p>{history[i].blackPlayer}</p>
                    <p>Vs.</p>
                    <p>{history[i].whitePlayer}</p>
                </div>
                <input type="button" value="Watch" onClick={() => watch(history[i].hash)} />
            </form>
        )

        if (id == history[i].white) {
            games.push(white)
        } else {
            games.push(black)
        }
    }

    return(
        <>
            <h1>History</h1>
            <Nav id={id} />
            {games}
        </>
    )
}