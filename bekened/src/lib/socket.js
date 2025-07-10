// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// let app = express();
// let server = http.createServer(app);

// let io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173"]
//   }
// });

// let userSocketMap = {}; // { userId: socketId }
// let userExpressionMap = {}; 

// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

// io.on("connection", (socket) => {
//   console.log("A user connected", socket.id);

//   let userId = socket.handshake.query.userId;

//   if (userId) {
//     userSocketMap[userId] = socket.id;
//   }

//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   socket.on("expression", ({ userId, expression }) => {
//     if (!userId || !expression) return;

//     userExpressionMap[userId] = expression;

//     Object.entries(userSocketMap).forEach(([otherUserId, sockId]) => {
//       if (otherUserId !== userId) {
//         io.to(sockId).emit("userExpression", { userId, expression });
//       }
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected", socket.id);

//     delete userSocketMap[userId];
//     delete userExpressionMap[userId];

//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export { io, app, server };



import { Server } from "socket.io";
import http from "http";
import express from "express";

let app = express();
let server = http.createServer(app);

let io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"]
  }
});

let userSocketMap = {}; // { userId: socketId }
let userExpressionMap = {}; 

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  let userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
     console.log("[SOCKET] Registered user:", userId, "->", socket.id);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("expression", ({ userId, expression }) => {
     console.log("[SERVER] Received expression event");
    if (!userId || typeof expression !== "string") return;

    userExpressionMap[userId] = expression;

    console.log("Server received expression:", userId, expression);

    Object.entries(userSocketMap).forEach(([otherUserId, sockId]) => {
      if (otherUserId !== userId) {
        console.log("[SERVER] Sending expression to", otherUserId);
        io.to(sockId).emit("userExpression", { userId, expression });
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete userSocketMap[userId];
    delete userExpressionMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };