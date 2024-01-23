import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export type TileType = {
    value: number,
    animationClass?: 'moved' | 'merged' | 'new',
    id: string
}

type BoardType = (TileType | null)[][]

function getInitialBoard() {
    const board: BoardType = [];

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
    const [board, setBoard] = useState<BoardType>(getInitialBoard);

    function shiftLeft() {
        let newBoard: BoardType = [];

        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            newBoard.push([]);

            for (let colIndex = 0; colIndex < 3; colIndex++) {
                if (board[rowIndex][colIndex] === null) continue;

                if (newBoard[rowIndex].length === 0 || board[rowIndex][colIndex]!.value !== newBoard[rowIndex].at(-1)!.value) {
                    newBoard[rowIndex].push({ ...(board[rowIndex][colIndex] as TileType), animationClass: 'moved' });
                } 
                else {
                    newBoard[rowIndex][newBoard[rowIndex].length-1]!.value *= 2;
                    newBoard[rowIndex][newBoard[rowIndex].length-1]!.animationClass = 'merged';
                }
            }

            while(newBoard[rowIndex].length < 3) newBoard[rowIndex].push(null);
        }

        setBoard(newBoard);
        console.log(newBoard)
    }

    return { board, shiftLeft }
}

export default useBoard