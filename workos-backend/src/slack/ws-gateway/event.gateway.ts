import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  
  constructor(private readonly _logger: Logger) {}
  
  @SubscribeMessage('user_changed')
  userChanged(@MessageBody() data: any): void {
    this._logger.log(`User Changed Event fired for ${data.slack_id}`);
    this.server.emit('user_changed', data);
  }
}
