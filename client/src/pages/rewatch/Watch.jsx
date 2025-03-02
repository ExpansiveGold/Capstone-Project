import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useIsMount } from '../../functions/useIsMount.jsx';
import axios from "axios";

export default function Watch() {
    const [game, setGame] = useState(new Chess()); 
    const [position, setPosition] = useState()
    const [moveNum, setMoveNum] = useState(0)
    const [lastPos, setLastPos] = useState(0)
    const [moves, setMoves] = useState([])
    const { id } = useParams()
    const isMount = useIsMount();

    useEffect(() => {
        axios.get(`/match/watch/${id}`)
        .then(function (response) {
            // handle success
            const move = response.data.moves
            setMoves(move)
            setPosition(move[moveNum].board)
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
        }
        setLastPos(moveNum)
        setPosition(moves[moveNum].board)
    }, [moveNum])

    const Undo = () => {
        if (moveNum === 0) return
        setMoveNum(moveNum - 1);
    }

    const Next = () => {
        if (moveNum === moves.length - 1) return
        setMoveNum(moveNum + 1);
    }

    return (
        <>
            <Chessboard 
                position={position}
                arePiecesDraggable={false}
            />
            <button onClick={Undo}>Undo</button>
            <button onClick={Next}>Next</button>
            <p>{game.pgn()}</p>
        </>
    )
}
