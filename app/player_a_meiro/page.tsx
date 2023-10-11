"use client"
import React, { useState } from 'react';

type Position = {
  x: number;
  y: number;
};

export default function Page() {
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 20);
    const y = Math.floor((e.clientY - rect.top) / 20);

    if (maze[y][x] === ' ') {
      setPlayerPosition({ x, y });
    }
  };

  const maze = [
    ['S', ' ', ' ', ' ', '#', '#', '#', '#', '#'],
    ['#', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', '#', '#', '#', '#', '#', ' ', '#'],
    ['#', ' ', '#', ' ', ' ', ' ', '#', ' ', '#'],
    ['#', ' ', '#', ' ', '#', ' ', '#', ' ', '#'],
    ['#', ' ', '#', ' ', '#', ' ', '#', ' ', '#'],
    ['#', ' ', '#', ' ', '#', ' ', ' ', ' ', '#'],
    ['#', ' ', ' ', ' ', '#', '#', '#', 'G', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#']
  ];

  return (
    <main>
      <p>player_a_meiro</p>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 20px)' }}
        onMouseMove={handleMouseMove}
      >
        {maze.map((row, rowIndex) => 
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor:
                  rowIndex === playerPosition.y && cellIndex === playerPosition.x ? 'blue' :
                  cell === '#' ? 'black' :
                  cell === 'S' ? 'green' :
                  cell === 'G' ? 'red' :
                  'white',
                border: '1px solid gray'
              }}
            ></div>
          ))
        )}
      </div>
    </main>
  );
}
