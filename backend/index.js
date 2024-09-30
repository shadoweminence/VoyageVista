const connectToMongo = require("./db");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

connectToMongo();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tourpack", require("./routes/tourpack"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/search", require("./routes/search"));

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message); // Broadcast to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = 5000;

server.listen(port, () => {
  console.log(`Voyage Vista backend listening at http://localhost:${port}`);
});
