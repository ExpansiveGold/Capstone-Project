import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useIsMount } from '../../functions/useIsMount.jsx';
import Nav from "../../components/navbar/navbar.jsx";
import Panel from "../../components/movePanel/movePanel.jsx";
import axios from "axios";
import './watch.css'

export default function Watch() {
    const [game, setGame] = useState(new Chess()); 
    const [position, setPosition] = useState()
    const [moveNum, setMoveNum] = useState(0)
    const [lastPos, setLastPos] = useState(0)
    const [players, setPlayers] = useState({})
    const [rotation, setRotation] = useState('white')
    // const [movelist, setMoveList] = useState([])
    const [moves, setMoves] = useState([])
    const { id, hash } = useParams()
    const isMount = useIsMount();
    var movelist = []

    for (let move of moves) {
        movelist.push(move.move)
    }
    console.log(movelist)

    useEffect(() => {
        axios.get(`/user/${id}/match/watch/${hash}`)
        .then(function (response) {
            // handle success
            const move = response.data.moves
            setMoves(move)
            setPosition(move[moveNum].board)
            setPlayers({
                white: response.data.whitePlayer, 
                black: response.data.blackPlayer
            })
            console.log(response, move);
        })
    }, [])

    useEffect(() => {
        if (isMount) return
        console.log(moveNum, moves)
        if (lastPos > moveNum) {
            game.undo()
        } else {
            game.move(moves[moveNum].move)
            movelist = game.pgn().split(' ')
        }
        setLastPos(moveNum)
        setPosition(moves[moveNum].board)
        console.log(movelist)
    }, [moveNum])

    const Undo = () => {
        if (moveNum === 0) return
        setMoveNum(moveNum - 1);
    }

    const Next = () => {
        if (moveNum === moves.length - 1) return
        setMoveNum(moveNum + 1);
    }

    const Rotate = () => {
        if (rotation === 'white'){
            setRotation('black')
        } else {
            setRotation('white')
        }
    }

    return (
        <div className="watch">
            {/* <h1>Watch</h1> */}
            <Nav id={id}/>
            <div className="main">
                <div>
                    <Chessboard 
                        position={position}
                        arePiecesDraggable={false}
                        boardOrientation={rotation}
                        boardWidth={580}
                    />
                </div>
                <div className="form-control">
                    {/* <p>{ movelist }</p> */}
                    <Panel moves={moves} selected={moveNum} players={players} />
                    <div className="controls">
                        <p className="button center-text watchbtn" onClick={Rotate}>Rotate</p>
                        <p className="button center-text watchbtn" onClick={Undo}>Undo</p>
                        <p className="button center-text watchbtn" onClick={Next}>Next</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
