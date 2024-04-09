import React, { useState } from "react";
import { Box, Button, Heading, Grid, GridItem, Text, VStack } from "@chakra-ui/react";

const BOARD_SIZE = 8;
const EMPTY = null;
const BLACK = "B";
const WHITE = "W";

const initialBoard = () => {
  const board = Array(BOARD_SIZE)
    .fill()
    .map(() => Array(BOARD_SIZE).fill(EMPTY));
  board[3][3] = WHITE;
  board[3][4] = BLACK;
  board[4][3] = BLACK;
  board[4][4] = WHITE;
  return board;
};

const Index = () => {
  const [board, setBoard] = useState(initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState(BLACK);

  const isValidMove = (row, col) => {
    if (board[row][col] !== EMPTY) return false;

    const opponent = currentPlayer === BLACK ? WHITE : BLACK;
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      let hasOpponent = false;

      while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
        if (board[x][y] === opponent) {
          hasOpponent = true;
        } else if (board[x][y] === currentPlayer) {
          if (hasOpponent) return true;
          break;
        } else {
          break;
        }
        x += dx;
        y += dy;
      }
    }

    return false;
  };

  const placePiece = (row, col) => {
    if (!isValidMove(row, col)) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = currentPlayer;

    const opponent = currentPlayer === BLACK ? WHITE : BLACK;
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      const flippedPieces = [];

      while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
        if (newBoard[x][y] === opponent) {
          flippedPieces.push([x, y]);
        } else if (newBoard[x][y] === currentPlayer) {
          flippedPieces.forEach(([fx, fy]) => {
            newBoard[fx][fy] = currentPlayer;
          });
          break;
        } else {
          break;
        }
        x += dx;
        y += dy;
      }
    }

    setBoard(newBoard);
    setCurrentPlayer(opponent);
  };

  const getCellColor = (row, col) => {
    if (board[row][col] === BLACK) return "black";
    if (board[row][col] === WHITE) return "white";
    return "green.500";
  };

  const resetGame = () => {
    setBoard(initialBoard());
    setCurrentPlayer(BLACK);
  };

  return (
    <VStack spacing={8} align="center">
      <Heading>Othello Game</Heading>
      <Text>Current Player: {currentPlayer === BLACK ? "Black" : "White"}</Text>
      <Grid templateColumns={`repeat(${BOARD_SIZE}, 1fr)`} gap={1}>
        {board.map((row, rowIdx) => row.map((_, colIdx) => <GridItem key={`${rowIdx}-${colIdx}`} w={12} h={12} bg={getCellColor(rowIdx, colIdx)} onClick={() => placePiece(rowIdx, colIdx)} cursor="pointer" />))}
      </Grid>
      <Button onClick={resetGame}>Reset Game</Button>
    </VStack>
  );
};

export default Index;
