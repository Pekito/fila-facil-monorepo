import express from "express";
import { Server } from "socket.io";
import SocketServer from "./socket-server";
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const socketServer = new SocketServer(server);