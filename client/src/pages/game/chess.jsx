import { useEffect, useState, useContext, use } from "react";
import { useNavigate} from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import Popup from 'reactjs-popup';
import { AuthContext } from '../../components/AuthContext';
import Nav from "../../components/navbar/navbar.jsx";
import Panel from "../../components/movePanel/movePanel.jsx";
import axios from "axios";
import './game.css'
import { socket } from "../../socket.js";

export default function Game() {
    const [user, setUser] = useState({})
    const [color, setColor] = useState('w')
    const [game, setGame] = useState(new Chess());
    const [position, setPosition] = useState(game.fen())
    const [moveNum, setMoveNum] = useState(0)
    const [popup, setPopup] = useState(null)
    const [giveup, setGiveup] = useState(false)
    const [gameover, setGameover] = useState(false)
    const [players, setPlayers] = useState({})
    const [rotation, setRotation] = useState('white')
    const [history, setHistory] = useState([{
        board: game.fen(),
        move: null
    }])
    const navigate = useNavigate()
    
    const { token, room, white, black } = useContext(AuthContext)
    
    useEffect(() => {
        socket.connect()

        return () => {
            socket.disconnect()
        }

    }, [])

    useEffect(() => {
        axios.post(`/auth/user`, {
            token: token
        })
        .then((res) => {
            setUser(res.data.user)
            console.log(res)
            setPlayers({
                white: white.username,
                black: black.username
            })
            socket.emit('join_game', {room})
            if (res.data.user._id === black.id) {
                console.log(room)
                setColor('b')
                rotate()
            }
        })
    }, [])


    useEffect(() => {
        const move_recieve = (data) => {
            updMove(data.from, data.to, data.piece)
        }

        const giveup_win = () => {
            giveUp()
        }

        socket.on('move_recieve', move_recieve)
        socket.on('giveup_win', giveup_win)

        return () => {
            socket.off("move_recieve", move_recieve);
            socket.off("giveup_win", giveup_win);
        };
    });

    useEffect(() => {
        if(game.isGameOver()) {
            if (game.turn() !== color) {
                gameOver()
                saveGame()
            }
        }
    }, [position])

    
    const updMove = (from, to, piece) => {
        console.log(from, to, 'move')
        if (!game.isGameOver()) {
            let moveMade = null
            try{
                moveMade = game.move({ from:from, to:to })
                socket.emit('move', { 
                    room: room, 
                    from: from, 
                    to: to, 
                    piece: piece 
                })

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
            ])

            

            console.log(game.ascii(), game.fen())
            return true
        }
        return false
    }

    const move = (from, to, piece) => {
        console.log(game.turn() === color && piece[0] === color)
        if (game.turn() === color && piece[0] === color) {
            console.log(from, to, 'move')
            if (!game.isGameOver()) {
                let moveMade = null
                try{
                    moveMade = game.move({ from:from, to:to })
                    socket.emit('move', { 
                        room: room, 
                        from: from, 
                        to: to, 
                        piece: piece 
                    })

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
                ])

                console.log(game.ascii(), game.fen())
                return true
            }
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

    const home = () => {
        navigate('/home')
    }

    const gameOver = () => {
        setGameover(true)
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        setPopup(
            <Popup trigger={<p></p>} open={game.isGameOver()} closeOnDocumentClick={false} closeOnEscape={false} modal>
                <div className="flexVertical popup">
                    <div className="mb-10">
                        <h1 className="center-text">{getWinner()} won!</h1>
                        {/* <h3 className="center-text">x has invited you to a match</h3> */}
                    </div>
                    {/* <div className="buttons"> */}
                        {/* <p className="buttonDel w45 center-text" onClick={home}>Back home</p> */}
                        <p className="buttonForm w45 center-text" onClick={home}>Back home</p>
                    {/* </div> */}
                </div>
            </Popup>
        )
    }

    const giveUp = () => {
        socket.emit('giveup', { room })
        gameOver(); 
        saveGame(); 
        home()
    }

    async function saveGame() {
        console.log('save')
        await axios.post('/auth/user/play', {
            white: `${white.id}`,   
            black: `${black.id}`,
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

    const rotate = () => {
        if (rotation === 'white'){
            setRotation('black')
        } else {
            setRotation('white')
        }
    }

    return (
        <div className="play">
            <div disabled>
                <Nav />
            </div>
            <div className="main">
                <div>
                    <Chessboard 
                        position={position} 
                        onPieceDrop={move} 
                        onPromotionCheck={promotionCheck} 
                        onPromotionPieceSelect={promotion}
                        boardWidth={580}
                        boardOrientation={rotation}
                        customBoardStyle={{borderRadius: '3px', border: '1px'}}
                    />
                </div>
                <div className="form-control">
                    {/* <p>{ movelist }</p> */}
                    <Panel moves={history} selected={moveNum} players={players} />
                    <div className="controls">
                        {/* <p className="button center-text watchbtn" onClick={showGiveUp}>Give up</p> */}
                        <Popup trigger={<p className="button center-text watchbtn">Give up</p>} open={giveup} onClose={() => {setGiveup(false)}} modal>
                            {close => (
                                <div className="flexVertical popup">
                                <div className="mb-10">
                                    <h1 className="center-text">Are you sure you want to give up?</h1>
                                    {/* <h3 className="center-text">x has invited you to a match</h3> */}
                                </div>
                                <div className="buttons">
                                    <p className="buttonForm w45 center-text" onClick={close}>Cancel</p>
                                    <p className="buttonDel w45 center-text" onClick={giveUp}>Give Up</p>
                                </div>
                            </div>
                            )}
                        </Popup>
                        <p className="button center-text watchbtn" onClick={rotate}>Rotate</p>
                        {/* <p className="button center-text watchbtn" onClick={Undo}>Undo</p>
                        <p className="button center-text watchbtn" onClick={Next}>Next</p> */}
                    </div>
                </div>
            </div>
            { game.isGameOver() === true ? popup : <div></div> }
        </div>
    )
}