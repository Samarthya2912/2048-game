import React, { useEffect } from 'react'
import useBoard from '../hooks/useBoard'
import Tile from './Tile';
import EmptyTile from './EmptyTile';

function Board() {
    const { board, shiftLeft, shiftRight, shiftUp, shiftDown } = useBoard();

    useEffect(() => {
        function keyDownHandler(e: globalThis.KeyboardEvent) {
            console.log(e.key)
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
    }, [shiftDown, shiftLeft, shiftRight, shiftUp])

    return (
        <>
            <div className="board">
                {
                    board.map((boardRow, rowIndex) => {
                        return <div className='board-row' key={rowIndex}>
                            {boardRow.map((tile, colIndex) => tile ?
                                <Tile key={tile.id} rowIndex={rowIndex} colIndex={colIndex} {...tile} /> : <EmptyTile rowIndex={rowIndex} colIndex={colIndex} />)}
                        </div>
                    })
                }
            </div></>
    )
}

export default Board