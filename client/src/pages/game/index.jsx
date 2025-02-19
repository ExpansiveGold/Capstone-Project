import React, { useState, useRef } from 'react';
import Chess from 'Chess.js';

const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const Game = () => {
    const [fen, setFen] = useState(FEN);
    const { current: chess } = useRef(new Chess(fen));

    return <div></div>;
};

export default Game;