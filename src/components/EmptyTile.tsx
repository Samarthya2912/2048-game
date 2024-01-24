import React from 'react'

type EmptyTileProps = {
    rowIndex: number,
    colIndex: number
}

function EmptyTile({ rowIndex, colIndex }: EmptyTileProps) {
    return (
        <div className={`tile`} style={{
            position: 'absolute',
            height: '50px',
            width: '50px',
            left: `${colIndex * 60}px`,
            top: `${rowIndex * 60}px`,
            border: 'solid black 2px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}></div>
    )
}

export default EmptyTile