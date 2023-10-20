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
  const [hasKey, setHasKey] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

    // 音声を再生する関数
    const playGameOverSound = () => {
      const sound = new Audio("/aaa.wav");
      sound.play();
    };

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

  // isGameOver変数がTrueになった際に実行される
  useEffect(() => {
    if (isGameOver) {
      playGameOverSound();
    }
  }, [isGameOver]);

  const restartGame = () => {
    setIsGameOver(false);
    setIsGameStarted(false);
    setHasKey(false);
    // 他に初期化するべきステートや変数があればこちらに追加
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    console.log(e.clientX);
    console.log(e.clientY);
    const x = Math.floor((e.clientX - rect.left) / 50);
    const y = Math.floor((e.clientY - rect.top) / 50);

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
    ['S', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', '#', ' ', ' ', ' ', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', '#', ' ', '#', ' ', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', '#', ' ', '#', ' ', '#', ' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', '#', ' ', '#', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', ' ', ' ', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'K'],
    ['#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '*', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', 'G', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#', ' ', '#', '#', '#', '#', '#', '#', '#', ' ', ' ', ' ', '#', '#', '#', '#', ' ', '#', '#', '#', '#', ' ', ' ', '#', '*', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', ' ', ' ', '#', '#', ' ', ' ', '#', '#', '#', '#', '#', ' ', '#', ' ', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', '#', '#', '#', '#', ' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', ' ', ' ', ' ', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ];

  return (
    <main>
      {!isGameStarted ? (
        // ゲームが開始されていない場合、スタートボタンを表示
        <button onClick={() => setIsGameStarted(true)}>スタート</button>
      ) :isGameOver ? (
        // ゲームオーバー時にリスタートのモーダル及び画像の表示、TailWindow
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
            gridTemplateColumns: 'repeat(38, 50px)',
            cursor: 'none',
            gridGap: '0px'
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
                  width: '50px',
                  height: '50px',
                  backgroundColor:
                    cell === '#' ? 'black' :
                    cell === 'S' ? 'green' :
                    cell === 'G' ? 'red' :
                    cell === 'K' ? (hasKey ? 'white' : 'gold') :  // キーを取得した後は、キーの位置を白に
                    cell === '*' ? (hasKey ? 'white' : 'silver') :  // 3. キーを取得した場合、障害物 * が消えるように
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

