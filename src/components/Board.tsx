import React from 'react'
import useBoard from '../hooks/useBoard'
import Tile from './Tile';

function Board() {
    const { tiles } = useBoard();

    return (
        <div className="board">
            <h2>Board</h2>
            {
                tiles.map((boardRow, rowIndex) => {
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