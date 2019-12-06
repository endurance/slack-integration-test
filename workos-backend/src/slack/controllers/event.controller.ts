import { Body, Controller, Get, Post } from "@nestjs/common";
import { SlackClientService } from "../services/slack-client.service";

interface SlackEvent {
  token: string,
  challenge: string,
  type: string,
}

@Controller("/event")
export class EventController {
  
  constructor(private readonly _slackClient: SlackClientService) {}
  
  @Post("/challenge")
  public async challenge(@Body() body: SlackEvent) {
    return body.challenge;
  }
  
  @Get("/info")
  public async info() {
    return await this._slackClient.users.list();
  }
  
}
