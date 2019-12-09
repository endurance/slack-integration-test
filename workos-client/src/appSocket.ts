import io from "socket.io-client";

export class AppSocket {
  static url = process.env.REACT_APP_SOCKET_IO_URL as unknown as string;

  static createNew = () => {
    return io.connect(AppSocket.url);
  }
}
