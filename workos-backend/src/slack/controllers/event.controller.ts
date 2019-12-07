import { Body, Controller, Post } from "@nestjs/common";
import { SlackClientService } from "../services/slack-client.service";
import { UserService } from "../services/user.service";
import { EventsGateway } from "../ws-gateway/event.gateway";

interface SlackEvent {
  token: string,
  challenge: string,
  type: string,
  event: any;
}

@Controller("/event")
export class EventController {

  constructor(
    private readonly _slackClient: SlackClientService,
    private readonly _userService: UserService,
    private readonly _eventGateway: EventsGateway,
  ) {}
  
  @Post("/receive")
  public async receive(@Body() body: SlackEvent) {
    if (body.challenge) {
      return body.challenge;
    }
    if (body.event.type === 'user_change') {
      const userData = body.event.user;
      const savedUser = await this._userService.saveUser(userData);
      return this._eventGateway.userChanged(savedUser);
    }
  }
}
