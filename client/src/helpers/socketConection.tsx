import io from "socket.io-client";
import { url } from "./connectionUrl";

export default class SocketConfig {
  private socket: any;

  constructor() {
    // console.log("url", url);
  }

  restart(): SocketIOClient.Socket {
    if (this.socket) this.socket.emit("reset game");
    return this.init();
  }

  init(): SocketIOClient.Socket {
    console.log("web socket connected", new Date());
    this.socket = io.connect(url);
    return this.socket;
  }
}
