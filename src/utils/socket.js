import io from "socket.io-client";
import config from "config";
const socket = io.connect(config.backendEndpoint);

export default socket;
