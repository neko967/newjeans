"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import localImage from "../../public/3.png";



type Position = {
  x: number;
  y: number;
};

export default function Page() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const cellSize = Math.min(windowSize.width, windowSize.height) / 10;
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameClear, setIsGameClear] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const keyImage = "/keyImage.png";

    // 音声を再生する関数
    const playGameOverSound = () => {
      const sound = new Audio("/aaaa.wav");
      sound.play();
    };

  useEffect(() => {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  useEffect(() => {
    // Move cursor to the starting position
    const startPosition = document.querySelector('[data-start]');
    if (startPosition) {
      startPosition.dispatchEvent(new MouseEvent('mousemove', {
        clientX: startPosition.getBoundingClientRect().left + 20,  // Center the cursor
        clientY: startPosition.getBoundingClientRect().top + 20,   // Center the cursor
        bubbles: true
      }));
    }
  }, []);

  useEffect(() => {
    if (isGameOver) {
      playGameOverSound();
    }
  }, [isGameOver]);


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);  // 40からcellSizeへ変更
    const y = Math.floor((e.clientY - rect.top) / cellSize);

    if (maze[y][x] === '#' || (maze[y][x] === '*' && !hasKey) ) {
      setIsGameOver(true);
    } else if (maze[y][x] === 'G') {
      setIsGameClear(true);
    } else if (maze[y][x] === 'K') {  // 2. プレイヤーがキーに当たった場合、hasKey を true に設定
      setHasKey(true);
    } else {
      setPlayerPosition({ x, y });
    }
  };

  const maze = [
    ['S', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', '#'],
    ['#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#'],
    ['#', ' ', '#', ' ', ' ', ' ', '#', ' ', '#', '#'],
    ['#', ' ', '#', ' ', '#', ' ', '#', ' ', '#', '#'],
    ['#', ' ', '#', ' ', '#', ' ', '#', ' ', '#', '#'],
    ['#', ' ', '#', ' ', '#', ' ', ' ', ' ', '#', '#'],
    ['#', ' ', ' ', ' ', '#', '#', '#', ' ', ' ', 'K'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '*', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', 'G', '#'],
  ];

  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <p>player_a_meiro</p>
      <p>X: {playerPosition.x}, Y: {playerPosition.y}</p>

      {!isGameStarted ? (
        // ゲームが開始されていない場合、スタートボタンを表示
        <button onClick={() => setIsGameStarted(true)}>スタート</button>
      ) :isGameOver ? (
          <Image src={localImage} alt="ホラー" />
      ) : isGameClear ? (
        <div style={{ fontSize: '24px', color: 'green' }}>ゲームクリア</div>
      ) : (
        <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(10, ${cellSize}px)`,
          cursor: 'none',
          gridGap: '0px',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
        onMouseMove={handleMouseMove}
      >
        {maze.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              data-start={cell === 'S' ? 'true' : undefined}
              style={{
                boxSizing: 'border-box',
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                backgroundColor:
                    cell === '#' ? 'black' :
                    cell === 'S' ? 'green' :
                    cell === 'G' ? 'red' :
                    cell === 'K' ? (hasKey ? 'white' : 'transparent') :  // 背景を透明に
                    cell === '*' ? (hasKey ? 'white' : 'silver') :
                    'white',
                  cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 2 2"><circle cx="1" cy="1" r="1" fill="black" /></svg>') 1 1, auto`,
                backgroundSize: 'cover',
                backgroundImage: cell === 'K' && !hasKey ? `url(${keyImage})` : undefined  // キーの場所で画像を表示
                }}
              ></div>
            ))
          )}
        </div>
      )}
    </main>
  );
}



