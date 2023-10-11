from fastapi import FastAPI, HTTPException, Request, WebSocket, Depends, HTTPException, status
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import List, Optional
from starlette.middleware.sessions import SessionMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.status import HTTP_403_FORBIDDEN
from starlette.requests import Request

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="some-secret-key")

class Room(BaseModel):
    name: str
    password: str
    id: Optional[int] = None

rooms = []

@app.post("/api/create-room")
async def create_room(room: Room, request: Request):
    room.id = len(rooms) + 1
    rooms.append(room)
    request.session["room_name"] = room.name
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
                request.session["room_name"] = room.name
                return {"name": room.name, "message": "Successfully joined the room"}

    raise HTTPException(status_code=404, detail="Room not found")

@app.get("/api/room-exists/{name}")
async def room_exists(name: str, request: Request):
    session_room_name = request.session.get("room_name")
    if not session_room_name or session_room_name != name:
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail="Access denied")
    for room in rooms:
        if room.name == name:
            return {"exists": True, "requiresPassword": bool(room.password)}
    return {"exists": False, "requiresPassword": False}

@app.get("/api/leave-room")
async def leave_room(request: Request):
    if "room_name" in request.session:
        del request.session["room_name"]
    return {"message": "Successfully left the room"}

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
