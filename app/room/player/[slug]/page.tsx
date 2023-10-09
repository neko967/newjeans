'use client';
import React, { useState, useEffect } from 'react';

export default function Player({ params }: {
  params: { slug: string },
}) {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8000/ws');
    setWs(websocket);

    websocket.onmessage = (event) => {
      setMessage(event.data);
    };

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
      <h1>player Room {params.slug}</h1>
      <button onClick={sendMessage}>例のアレボタン</button>
      <div>Received message: {message}</div>
    </div>
  );
}
