import { useState } from "react"
import './movePanel.css'

export default function Panel(props){
    var moves = props.moves
    var selected = props.selected
    var players = props.players
    console.log(moves)
    var movelist = []

    for (let move = 1; move < moves.length; move++) {
        if (move === moves.length - 1 && move % 2 != 0 ) {
            movelist.push([moves[move].move])
            continue
        }
        if (move % 2 == 0) continue
        movelist.push([moves[move].move, moves[move + 1].move])
    }

    console.log(movelist)

    var turn = Math.round(selected / 2)
    var plays = selected % 2

    const move = []
    for (let i = 1; i <= movelist.length; i++) {
        move.push(
            <div className={i % 2 === 0 ? 'even row' : 'odd row' }>
                <p>{ i }.</p>
                <div className=" row-item">
                    <p className={ turn === i && plays === 1 ? 'selected' : '' }>{ movelist[i - 1][0] }</p>
                </div>
                <div className=" row-item">
                    <p className={ turn === i && plays === 0 ? 'selected' : '' }>{ movelist[i - 1][1] }</p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-90">
            {/* <div className="row pr-5 mr-5 odd moves-top">
                <p></p>
                <div className="row-item">
                    <p>White</p>
                </div>
                <div className="row-item">
                    <p>Black</p>
                </div>
            </div> */}
            <div className="names pr-5 mr-5 odd moves-top">
                {/* <p></p> */}
                <div className="name">
                    <div className="white-block"></div>
                    <p>{players.white}</p>
                </div>
                <p></p>
                <div className="name">
                    <div className="black-block"></div>
                    <p>{players.black}</p>
                </div>
                {/* <p></p> */}
            </div>
            <hr className="mr-5 line"/>
            <div className="scroll moves-bottom h-90">
                { move }
            </div>
        </div>
    )
}