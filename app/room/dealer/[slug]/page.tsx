'use client';
import React, { useState, useEffect } from 'react';

export default function Dealer({ params }: {
  params: { slug: string },
}) {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8000/ws');
    setWs(websocket);

    websocket.onmessage = (event) => {
      setMessage(event.data);  // メッセージを受け取ったときに状態を更新
    };

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send('horror');
    }
  };

  return (
    <div>
      <h1>Dealer Room {params.slug}</h1>
      <button onClick={sendMessage}>あのボタン</button>
      <div>Received message: {message}</div>
    </div>
  );
}