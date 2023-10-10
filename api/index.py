from fastapi import FastAPI, HTTPException, Request, WebSocket, Depends, HTTPException, status
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class Room(BaseModel):
    name: str
    password: str
    id: Optional[int] = None

rooms = []

@app.post("/api/create-room")
async def create_room(room: Room):
    room.id = len(rooms) + 1
    rooms.append(room)
    return room

@app.get("/api/list-rooms")
async def list_rooms():
    return rooms

@app.post("/api/join-room/{room_id}")
async def join_room(room_id: int, request: Request):
    for room in rooms:
        if room.id == room_id:
            entered_password = (await request.json())["password"]
            if entered_password == room.password:
                return {"name": room.name, "message": "Successfully joined the room"}
    raise HTTPException(status_code=404, detail="Room not found")

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     while True:
#         data = await websocket.receive_text()
#         await websocket.send_text(f"Message text was: {data}")

# 接続しているすべてのWebSocketを保持するリスト
connections: List[WebSocket] = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            for connection in connections:
                await connection.send_text(f"Message text was: {data}")
    except:
        connections.remove(websocket)