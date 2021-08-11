const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

const config = require("./config");
const routes = require("./routes");
const SocketServer = require("./utils/socket");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "../build/index.html"));
});

// Socket
const server = http.createServer(app);
new SocketServer(server);

console.log(path.join(__dirname, "../build/index.html"));

const port = config.port;
server.listen(port, () => console.log(`server is running on port ${port}`));
