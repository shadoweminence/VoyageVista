const connectToMongo = require("./db");
const express = require("express");
const http = require("http");

const cors = require("cors");

connectToMongo();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tourpack", require("./routes/tourpack"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/search", require("./routes/search"));
app.use("/api/images", require("./routes/images"));

const port = 5000;

server.listen(port, () => {
  console.log(`Voyage Vista backend listening at http://localhost:${port}`);
});
