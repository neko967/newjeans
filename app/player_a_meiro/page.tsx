"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import localImage from "../../public/3.png";

type Position = {
  x: number;
  y: number;
};

export default function Page() {
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 0, y: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameClear, setIsGameClear] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [keys, setKeys] = useState({
    key1: false,
    key2: false,
    key3: false
  });

    // 音声を再生する関数
    const playGameOverSound = () => {
      const sound = new Audio("/aaa.wav");
      sound.play();
    };

  useEffect(() => {
    // Only run this effect when the game is started
    if (isGameStarted) {
      // Move cursor to the starting position
      const startPosition = document.querySelector('[data-start]');
      if (startPosition) {
        startPosition.dispatchEvent(new MouseEvent('mousemove', {
          clientX: startPosition.getBoundingClientRect().left + 20,  // Center the cursor
          clientY: startPosition.getBoundingClientRect().top + 20,   // Center the cursor
          bubbles: true
        }));
      }
    }
  }, [isGameStarted]);

  // isGameOver変数がTrueになった際に実行される
  useEffect(() => {
    if (isGameOver) {
      playGameOverSound();
    }
  }, [isGameOver]);

  const restartGame = () => {
    setIsGameOver(false);
    setIsGameStarted(false);
    // 他に初期化するべきステートや変数があればこちらに追加
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    console.log(e.clientX);
    console.log(e.clientY);
    const x = Math.floor((e.clientX - rect.left) / 40);
    const y = Math.floor((e.clientY - rect.top) / 40);

    if (maze[y][x] === '#' || (maze[y][x] === '*' && !keys) ) {
      setIsGameOver(true);
    } else if (maze[y][x] === 'G') {
      setIsGameClear(true);
    } else if (y === 15 && x === 5 && maze[y][x] === 'K') {
      setKeys(prev => ({ ...prev, key1: true }));
      maze[12][7] = ' ';
    } else if (y === 6 && x === 5 && maze[y][x] === 'K') {
      setKeys(prev => ({ ...prev, key2: true }));
      maze[5][17] = ' ';
    } else if (y === 13 && x === 24 && maze[y][x] === 'K') {
      setKeys(prev => ({ ...prev, key3: true }));
      maze[14][23] = ' ';
    } else {
      setPlayerPosition({ x, y });
    }
  };

  const maze = [
    ['S', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', '#', '#'],
    ['#', ' ', '#', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', '#', '#', '#', '#', ' ', ' ', ' ', '#', '#'],
    ['#', ' ', '#', ' ', '#', ' ', '#', ' ', '#', '#', '#', ' ', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#'],
    ['#', ' ', ' ', ' ', '#', ' ', '#', ' ', '#', '#', '#', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#'],
    ['#', ' ', '#', ' ', '#', ' ', ' ', ' ', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#'],
    ['#', ' ', '#', ' ', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', '#', ' ', '#', 'K', ' ', ' ', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#'],
    ['#', ' ', '#', ' ', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', '#', '#', '#'],
    ['#', ' ', '#', ' ', '#', ' ', ' ', ' ', '#', '#', ' ', ' ', ' ', ' ', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', '#', ' ', ' ', ' ', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', '#', '#', '#'],
    ['#', ' ', '#', ' ', '#', ' ', '#', ' ', '#', '#', '#', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#'],
    ['#', ' ', '#', ' ', '#', ' ', '#', ' ', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', '#', '#', '#'],
    ['#', ' ', '#', ' ', '#', ' ', ' ', '*', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', ' ', ' ', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'K'],
    ['#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '*', '#'],
    ['#', ' ', ' ', ' ', ' ', 'K', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', 'G', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ];

  return (
    <main>
      {!isGameStarted ? (
        // ゲームが開始されていない場合、スタートボタンを表示
        <button onClick={() => setIsGameStarted(true)}>スタート</button>
      ) :isGameOver ? (
        // ゲームオーバー時にリスタートのモーダル及び画像の表示、TailWindow使用。
        <div>
          <Image src={localImage} alt="ホラー" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg">
            <button onClick={restartGame} className="bg-blue-500 text-white px-4 py-2 rounded">やり直し</button>
          </div>
        </div>
      ) : isGameClear ? (
        <div style={{ fontSize: '24px', color: 'green' }}>ゲームクリア</div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(25, 40px)',
            cursor: 'none',
            gridGap: '0px',
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
                  width: '40px',
                  height: '40px',
                  backgroundColor:
                    cell === '#' ? 'black' :
                    cell === 'S' ? 'green' :
                    cell === 'G' ? 'red' :
                    cell === 'K' ? (
                      rowIndex === 15 && cellIndex === 5 && keys.key1 ? 'white' :
                      rowIndex === 6 && cellIndex === 5 && keys.key2 ? 'white' :
                      rowIndex === 13 && cellIndex === 24 && keys.key3 ? 'white' : 'gold'
                    ) :
                    cell === '*' ? (
                      rowIndex === 12 && cellIndex === 7 && keys.key1 ? 'white' :
                      rowIndex === 5 && cellIndex === 17 && keys.key2 ? 'white' :
                      rowIndex === 14 && cellIndex === 23 && keys.key3 ? 'white' : 'silver'
                    ) :
                    'white',
                  cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 2 2"><circle cx="1" cy="1" r="1" fill="black" /></svg>') 1 1, auto`
                }}
              ></div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

