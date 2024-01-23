import React, { useEffect } from 'react'
import useBoard from '../hooks/useBoard'
import Tile from './Tile';

function Board() {
    const { board, shiftLeft } = useBoard();

    useEffect(() => {
        function keyDownHandler(e: globalThis.KeyboardEvent) {
            console.log(e.key)
            if(e.key === "ArrowLeft") {
                shiftLeft();
            }
        }

        document.addEventListener('keydown', keyDownHandler)

        return () => document.removeEventListener('keydown', keyDownHandler);
    }, [shiftLeft])

    return (
        <div className="board">
            <h2>Board</h2>
            {
                board.map((boardRow, rowIndex) => {
                    return <div className='board-row' key={rowIndex}>
                        {boardRow.map((tile, colIndex) => tile &&
                            <Tile key={tile.id} rowIndex={rowIndex} colIndex={colIndex} {...tile} />)}
                    </div>
                })
            }
        </div>
    )
}

export default Board