import React from 'react'
import { TileType } from '../hooks/useBoard'

type TileProps = Partial<TileType>;

function Tile({ value, animationClass }: TileProps) {
    return (
        <div className={`tile ${animationClass ?? ''}`}>{value ?? ''}</div>
    )
}

export default Tile