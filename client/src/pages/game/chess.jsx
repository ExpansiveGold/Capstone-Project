import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Game() {
    const [game, setGame] = useState(new Chess());
    const [position, setPosition] = useState(game.fen())
    const [history, setHistory] = useState([{
        board: game.fen(),
        move: null
    }])
    const navigate = useNavigate()
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
                white: '67bb75d432899ec57c77eebf',   
                black: '67bb761132899ec57c77eec3',
                moves: history,
                movesPgn: game.pgn(),
                result: getWinner()
        })
        .then(function (res) {
            console.log(res)
            navigate("/match/play")
        })
    }

    const getWinner = () => {
        if (game.turn() === 'b') {
            return 'White'
        } else {
            return 'Black'
        }
    }

    return (
        <div>
            <Chessboard 
                position={position} 
                onPieceDrop={move} 
                onPromotionCheck={promotionCheck} 
                onPromotionPieceSelect={promotion}
            />
            <button onClick={()=>{navigate('/match/watch/$2b$10$iSZ2gWhsxpDFVOAr9ms30uxCM4w0rFohu4F2ziSG16QbvFxOrBbbW')}}>Watch</button>
        </div>
    )
}