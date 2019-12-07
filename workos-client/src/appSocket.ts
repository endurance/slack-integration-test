import io from "socket.io-client";

const url = process.env.REACT_APP_SOCKET_IO_URL as unknown as string;
export const appSocket = io.connect(url);
