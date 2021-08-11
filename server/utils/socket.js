const socket = require("socket.io");
class SocketServer {
  constructor(server) {
    this.io = socket(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    this.shapes = [];
    this.io.on("connection", this.onConnection.bind(this));
  }
  initClient(socket) {
    console.log("New client connected");

    for (let i in this.shapes) {
      socket.emit("draw_shape", this.shapes[i]);
    }
  }
  onConnection(socket) {
    this.initClient(socket);
    socket.on("draw_shape", (data) =>
      this.onDrawShape.bind(this)(socket, data)
    );
    socket.on("modify_shape", (data) =>
      this.onModifyShape.bind(this)(socket, data)
    );
    socket.on("reset", () => this.onReset.bind(this)(socket));
  }

  onDrawShape(socket, data) {
    this.shapes.push(data);
    socket.broadcast.emit("draw_shape", data);
  }
  onModifyShape(socket, info) {
    let shape = this.shapes.find((item) => item.id === info.id);
    if (!shape) {
      console.log("Not Found!");
      return;
    }

    if (shape.type === "PEN") {
      shape.points = shape.points.concat([info.point.x, info.point.y]);
    }
    if (
      shape.type === "LINE" ||
      shape.type === "RECT" ||
      shape.type === "CIRCLE"
    ) {
      shape.points = shape.points
        .slice(0, 2)
        .concat([info.point.x, info.point.y]);
    }
    socket.broadcast.emit("modify_shape", info);
  }
  onReset(socket) {
    this.shapes = [];
    socket.broadcast.emit("reset");
  }
}

module.exports = SocketServer;
