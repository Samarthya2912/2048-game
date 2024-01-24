import React from 'react'
import { TileType } from '../hooks/useBoard'

type TileProps = TileType & {
    rowIndex: number,
    colIndex: number
}

function Tile({ rowIndex, colIndex, ...tile }: TileProps) {
    return (
        <div className={`tile ${tile.animationClass}`} style={{
            position: 'absolute',
            height: '50px',
            width: '50px',
            left: `${colIndex * 60}px`,
            top: `${rowIndex * 60}px`,
            border: 'solid black 2px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // transition: 'left 1s ease, top 1s ease'
        }}>{tile.value}</div>
    )
}

export default Tile