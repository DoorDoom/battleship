import { WebSocketServer } from "ws";
import type { CustomRequest } from "./types/requests.ts";
import { routeHandler } from "./handlers/routeHandler.ts";
import { UserStorage } from "./data/dataStorage.ts";

const userStorage = new UserStorage();
const PORT = 3000;

const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server listening on ws://localhost:${PORT}`);

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message: Buffer) => {
    console.log("Received from client:", message.toString());
    const request: CustomRequest = JSON.parse(message.toString());
    request.data = JSON.parse(request.data.toString());
    console.log(request);
    try {
      const response = routeHandler(request, userStorage);
      ws.send(JSON.stringify(response));
    } catch (error) {
      console.log(error);
      ws.send(JSON.stringify({ msg: (error as Error).message }));
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (err) => {
    console.error("WebSocket error on server:", err);
  });
});
