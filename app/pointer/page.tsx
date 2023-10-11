"use client"
import { useState, useEffect } from 'react';

type GameStatus = 'playing' | 'lost' | 'won';
type Position = { x: number; y: number };

export default function Page() {
  // 迷路のデザインとゲームのステータス
  const maze = [
    [2, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 3],
  ];
  
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;

      let newX = playerPos.x;
      let newY = playerPos.y;

      if (e.key === 'ArrowUp' && newY > 0) newY--;
      else if (e.key === 'ArrowDown' && newY < maze.length - 1) newY++;
      else if (e.key === 'ArrowLeft' && newX > 0) newX--;
      else if (e.key === 'ArrowRight' && newX < maze[0].length - 1) newX++;

      if (maze[newY][newX] === 1) {
        setPlayerPos({ x: newX, y: newY });
      } else if (maze[newY][newX] === 3) {
        setGameStatus('won');
      } else if (maze[newY][newX] === 0) {
        setGameStatus('lost');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPos, gameStatus, maze]);

  return (
    <main>
      {maze.map((row, y) => (
        <div key={y}>
          {row.map((cell, x) => {
            if (playerPos.x === x && playerPos.y === y) {
              return <span key={x} style={{ background: 'blue', display: 'inline-block', width: '20px', height: '20px' }}></span>;
            }
            switch (cell) {
              case 0:
                return <span key={x} style={{ background: 'black', display: 'inline-block', width: '20px', height: '20px' }}></span>;
              case 1:
                return <span key={x} style={{ background: 'white', display: 'inline-block', width: '20px', height: '20px' }}></span>;
              case 2:
              case 3:
                return <span key={x} style={{ background: 'red', display: 'inline-block', width: '20px', height: '20px' }}></span>;
              default:
                return null;
            }
          })}
        </div>
      ))}
      {gameStatus === 'won' && <p>おめでとうございます！クリアしました！</p>}
      {gameStatus === 'lost' && <p>ゲームオーバー！再挑戦してください。</p>}
    </main>
  );
}