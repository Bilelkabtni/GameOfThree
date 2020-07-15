import io from "socket.io-client";
import { url } from "./connectionUrl";

export default class SocketConfig {
  private socket: any;

  constructor() {
  }

  restart(): SocketIOClient.Socket {
    if (this.socket) this.socket.emit("reset game");
    return this.init();
  }

  init(): SocketIOClient.Socket {
    this.socket = io.connect(url);
    return this.socket;
  }
}
