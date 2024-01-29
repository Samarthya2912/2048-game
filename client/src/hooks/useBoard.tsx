import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export type TileType = {
    value: number,
    animationClass?: 'merged' | 'new',
    id: string
}

type BoardType = (TileType | null)[][]

function getInitialBoard() {
    const board: BoardType = [];

    for (let i = 0; i < 4; i++) {
        board.push([]);
        for (let j = 0; j < 4; j++) {
            if (i === 0 && (j === 0 || j === 3)) {
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
    const [score, setScore] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);

    const WINNING_SCORE = 2048;

    const getInvertedBoard = useCallback((board: BoardType) => {
        let newBoard: BoardType = [];

        for (let i = 0; i < 4; i++) {
            newBoard.push([]);
            for (let j = 0; j < 4; j++) {
                newBoard[i].push(board[i][3 - j]);
            }
        }

        return newBoard;
    }, [])

    const isBoardConfigurationSame = useCallback((boardA: BoardType, boardB: BoardType) => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (boardA[i][j] === null && boardB[i][j] !== null) return false;
                else if (boardA[i][j] !== null && boardB[i][j] === null) return false;
                else if (boardA[i][j]?.id !== boardB[i][j]?.id) return false;
            }
        }

        return true;
    }, [])

    const placeRandomTile = useCallback((board: BoardType) => {
        const freeIndices = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === null) freeIndices.push({ x: i, y: j });
                if (board[i][j] !== null && board[i][j]!.animationClass === 'new') board[i][j]!.animationClass = undefined;
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
        for (let i = 0; i < 4; i++) {
            newBoard.push([]);
            for (let j = 0; j < 4; j++) {
                newBoard[i][j] = board[j][i];
            }
        }

        return newBoard;
    }, [])

    const getInvertedTransposedBoard = useCallback((board: BoardType) => {
        const newBoard: BoardType = [];
        for (let i = 0; i < 4; i++) {
            newBoard.push([]);
            for (let j = 0; j < 4; j++) {
                newBoard[i][j] = board[3 - j][3 - i];
            }
        }

        return newBoard;
    }, [])

    const getLeftShiftedBoard = useCallback((board: BoardType) => {
        let newBoard: BoardType = [];

        for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
            newBoard.push([]);

            for (let colIndex = 0; colIndex < 4; colIndex++) {
                if (board[rowIndex][colIndex] === null) continue;

                if (newBoard[rowIndex].length === 0 || board[rowIndex][colIndex]!.value !== newBoard[rowIndex].at(-1)!.value || newBoard[rowIndex].at(-1)!.animationClass === 'merged') {
                    newBoard[rowIndex].push({
                        ...(board[rowIndex][colIndex] as TileType), animationClass: undefined
                    });
                }
                else {
                    newBoard[rowIndex][newBoard[rowIndex].length - 1]!.value *= 2;
                    setScore(score + newBoard[rowIndex][newBoard[rowIndex].length - 1]!.value);
                    newBoard[rowIndex][newBoard[rowIndex].length - 1]!.animationClass = 'merged';
                }

                if(newBoard[rowIndex].at(-1)!.value === WINNING_SCORE) setGameCompleted(true);
            }

            while (newBoard[rowIndex].length < 4) newBoard[rowIndex].push(null);
        }

        if (!isBoardConfigurationSame(board, newBoard)) placeRandomTile(newBoard);

        return newBoard;
    }, [isBoardConfigurationSame, placeRandomTile, score])

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

    const resetBoard = useCallback(() => {
        setScore(0);
        setGameCompleted(false);
        setBoard(getInitialBoard());
    }, [])

    return { board, shiftLeft, shiftRight, shiftUp, shiftDown, score, gameCompleted, resetBoard }
}

export default useBoard