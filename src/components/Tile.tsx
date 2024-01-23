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
            height: '30px',
            width: '30px',
            left: `${colIndex * 50}px`,
            top: `${rowIndex * 50}px`,
            border: 'solid black 2px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>{tile.value}</div>
    )
}

export default Tile