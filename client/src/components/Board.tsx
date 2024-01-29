import React, { useEffect } from 'react'
import useBoard from '../hooks/useBoard'
import Tile from './Tile';
import { Button } from "baseui/button";

function Board() {
    const { board, shiftLeft, shiftRight, shiftUp, shiftDown, score, gameCompleted, resetBoard } = useBoard();

    useEffect(() => {
        function keyDownHandler(e: globalThis.KeyboardEvent) {
            if (gameCompleted) return;

            if (e.key === "ArrowLeft") {
                shiftLeft();
            } else if (e.key === "ArrowRight") {
                shiftRight();
            } else if (e.key === "ArrowUp") {
                shiftUp();
            } else if (e.key === "ArrowDown") {
                shiftDown();
            }
        }

        document.addEventListener('keydown', keyDownHandler)

        return () => document.removeEventListener('keydown', keyDownHandler);
    }, [shiftDown, shiftLeft, shiftRight, shiftUp, gameCompleted])

    return (
        <div className='board-wrapper'>
            <div className="score">Score: {score}</div>
            {gameCompleted && <h1>Yay! You won the game.</h1>}
            <div className="board">
                {
                    board.map((boardRow, rowIndex) => {
                        return <div className='board-row' key={rowIndex}>
                            {boardRow.map((tile, colIndex) => <Tile key={colIndex} {...tile} />)}
                        </div>
                    })
                }
            </div>
            <Button
                size="large"
                onClick={resetBoard}
            >
                Reset
            </Button>
        </div>
    )
}

export default Board