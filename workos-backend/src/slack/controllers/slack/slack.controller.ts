import { Controller, Get } from "@nestjs/common";
import { SlackClientService } from "../../services/slack-client-service/slack-client.service";

@Controller("/slack")
export class SlackController {
  
  constructor(
    private readonly _slackClient: SlackClientService,
  ) {}
  
  @Get("/list")
  public async allUsers() {
    return await this._slackClient.users.list();
  }
}
