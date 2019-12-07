import { Body, Controller, Post } from "@nestjs/common";
import { SlackClientService } from "../../services/slack-client.service";
import { UserService } from "../../services/user.service";
import { EventsGateway } from "../../ws-gateway/event.gateway";
import { UserEntity } from "../../../db/entities/user.entity";

export class SlackEvent {
  token: string;
  challenge: string;
  type: string;
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
    if (body.event.type === "user_change") {
      const userData = body.event.user as UserEntity;
      const savedUser = await this._userService.saveRawUser(userData);
      return this._eventGateway.userChanged(savedUser);
    }
  }
}
