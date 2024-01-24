import { useCallback, useState } from 'react'
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
                    value: 2, id: uuidv4(), animationClass: 'new'
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

    const getInvertedBoard = useCallback((board: BoardType) => {
        let newBoard: BoardType = [];

        for (let i = 0; i < 3; i++) {
            newBoard.push([]);
            for (let j = 0; j < 3; j++) {
                newBoard[i].push(board[i][2 - j]);
            }
        }

        return newBoard;
    }, [])

    const isBoardConfigurationSame = useCallback((boardA: BoardType, boardB: BoardType) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (boardA[i][j] === null && boardB[i][j] !== null) return false;
                else if (boardA[i][j] !== null && boardB[i][j] === null) return false;
                else if (boardA[i][j]?.id !== boardB[i][j]?.id) return false;
            }
        }

        return true;
    }, [])

    const placeRandomTile = useCallback((board: BoardType) => {
        const freeIndices = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === null) freeIndices.push({ x: i, y: j });
            }
        }

        let randomTileIndex = Math.floor(Math.random() * freeIndices.length);
        board[freeIndices[randomTileIndex].x][freeIndices[randomTileIndex].y] = {
            value: 2,
            id: uuidv4(),
            animationClass: 'new'
        }
    }, [])

    const getTransposedBoard = useCallback((board: BoardType) => {
        const newBoard: BoardType = [];
        for (let i = 0; i < 3; i++) {
            newBoard.push([]);
            for (let j = 0; j < 3; j++) {
                newBoard[i][j] = board[j][i];
            }
        }

        return newBoard;
    }, [])

    const getInvertedTransposedBoard = useCallback((board: BoardType) => {
        const newBoard: BoardType = [];
        for (let i = 0; i < 3; i++) {
            newBoard.push([]);
            for (let j = 0; j < 3; j++) {
                newBoard[i][j] = board[2 - j][2 - i];
            }
        }

        return newBoard;
    }, [])

    const getLeftShiftedBoard = useCallback((board: BoardType) => {
        let newBoard: BoardType = [];

        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            newBoard.push([]);

            for (let colIndex = 0; colIndex < 3; colIndex++) {
                if (board[rowIndex][colIndex] === null) continue;

                if (newBoard[rowIndex].length === 0 || board[rowIndex][colIndex]!.value !== newBoard[rowIndex].at(-1)!.value || newBoard[rowIndex].at(-1)!.animationClass === 'merged') {
                    newBoard[rowIndex].push({
                        ...(board[rowIndex][colIndex] as TileType),
                    });

                    if(colIndex + 1 === newBoard[rowIndex].length) newBoard[rowIndex][newBoard[rowIndex].length-1]!.animationClass = 'moved';
                }
                else {
                    newBoard[rowIndex][newBoard[rowIndex].length - 1]!.value *= 2;
                    newBoard[rowIndex][newBoard[rowIndex].length - 1]!.animationClass = 'merged';
                }
            }

            while (newBoard[rowIndex].length < 3) newBoard[rowIndex].push(null);
        }

        if (!isBoardConfigurationSame(board, newBoard)) placeRandomTile(newBoard);
        return newBoard;
    }, [isBoardConfigurationSame, placeRandomTile])

    const shiftLeft = useCallback(() => {
        setBoard(getLeftShiftedBoard(board));
    }, [board, getLeftShiftedBoard])

    const shiftRight = useCallback(() => {
        setBoard(getInvertedBoard(getLeftShiftedBoard(getInvertedBoard(board))));
    }, [board, getInvertedBoard, getLeftShiftedBoard])

    const shiftUp = useCallback(() => {
        setBoard(getTransposedBoard(getLeftShiftedBoard(getTransposedBoard(board))));
    }, [board, getLeftShiftedBoard, getTransposedBoard])

    const shiftDown = useCallback(() => {
        setBoard(getInvertedTransposedBoard(getLeftShiftedBoard(getInvertedTransposedBoard(board))));
    }, [board, getInvertedTransposedBoard, getLeftShiftedBoard])

    return { board, shiftLeft, shiftRight, shiftUp, shiftDown }
}

export default useBoard