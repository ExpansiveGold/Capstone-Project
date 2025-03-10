import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import Nav from "../../components/navbar/navbar.jsx";
import Panel from "../../components/movePanel/movePanel.jsx";
import axios from "axios";
import './game.css'

export default function Game() {
    const [game, setGame] = useState(new Chess());
    const [position, setPosition] = useState(game.fen())
    const [moveNum, setMoveNum] = useState(0)
    const [players, setPlayers] = useState({})
    const [rotation, setRotation] = useState('white')

    const [moves, setMoves] = useState([])
    const [history, setHistory] = useState([{
        board: game.fen(),
        move: null
    }])
    const { id } = useParams()
    // const navigate = useNavigate()
    // const pgn = '1. e4 e5 2. Qh5 Nc6 3. Bc4 Nb4 4. Qxf7#'

    useEffect(() => {
        if(game.isGameOver()) {
            console.log(game.isGameOver(), game.pgn(), 'Fim de Jogo', history)
            saveGame()
        }
    }, [position])

    const move = (from, to) => {
        console.log(from, to, 'move')
        if (!game.isGameOver()) {
            let moveMade = null
            try{
                moveMade = game.move({ from:from, to:to })
            } catch {
                console.log('Movimento invalido')
                return false
            }
            console.log(moveMade)

            setPosition(game.fen())
            setHistory([
                    ...history,
                    {
                        board: game.fen(),
                        move: moveMade.san
                    }
                ]
            )

            console.log(game.ascii(), game.fen())
            return true
        }
        return false
    }

    const promotionCheck = (from, to, piece) => {
        console.log(from, to, piece, 'check')
        if (((piece === "wP" && from[1] === "7" && to[1] === "8") || 
             (piece === "bP" && from[1] === "2" && to[1] === "1"))) {
            return true
        }
        return false
    }

    const promotion = (piece, promoteFrom, promoteTo) => {
        console.log(game.ascii(), game.fen())
        game.move({ from:promoteFrom, to:promoteTo, promotion:piece[1].toLowerCase() })
        setPosition(game.fen())
    }

    async function saveGame() {
        console.log('save')
        await axios.post('/match/play', {
            white: 
            '67ca3e67b9e09534c9f921fd',   
            black: 
            '67bb75f932899ec57c77eec1',
                moves: history,
                movesPgn: game.pgn(),
                result: getWinner()
        })
        .then(function (res) {
            console.log(res)
            // navigate("/match/play")
        })
    }

    const getWinner = () => {
        if (game.turn() === 'b') {
            return 'White'
        } else {
            return 'Black'
        }
    }

    const Rotate = () => {
        if (rotation === 'white'){
            setRotation('black')
        } else {
            setRotation('white')
        }
    }

    return (
        <div className="play">
            <Nav id={id}/>
            <div className="main">
                <div>
                    <Chessboard 
                        position={position} 
                        onPieceDrop={move} 
                        onPromotionCheck={promotionCheck} 
                        onPromotionPieceSelect={promotion}
                        boardWidth={580}
                    />
                </div>
                <div className="form-control">
                    {/* <p>{ movelist }</p> */}
                    <Panel moves={moves} selected={moveNum} players={players} />
                    <div className="controls">
                        <p className="button center-text watchbtn" onClick={Rotate}>Rotate</p>
                        {/* <p className="button center-text watchbtn" onClick={Undo}>Undo</p>
                        <p className="button center-text watchbtn" onClick={Next}>Next</p> */}
                    </div>
                </div>
            </div>
            {/* <button onClick={()=>{navigate('/match/watch/$2b$10$iSZ2gWhsxpDFVOAr9ms30uxCM4w0rFohu4F2ziSG16QbvFxOrBbbW')}}>Watch</button> */}
        </div>
    )
}