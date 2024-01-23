import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export type TileType = {
    value: number,
    animationClass?: 'moved' | 'merged' | 'new',
    id: string
}

function getInitialBoard() {
    const board: (TileType | null)[][] = [];

    for (let i = 0; i < 3; i++) {
        board.push([]);
        for (let j = 0; j < 3; j++) {
            if (i === 0 && (j === 0 || j === 2)) {
                board[i].push({
                    value: 2, id: uuidv4()
                })
            } else {
                board[i].push(null);
            }
        }
    }

    return board;
}

function useBoard() {
    const [tiles, setTiles] = useState<(TileType | null)[][]>(getInitialBoard);

    function shiftLeft() {

    }

    return { tiles }
}

export default useBoard