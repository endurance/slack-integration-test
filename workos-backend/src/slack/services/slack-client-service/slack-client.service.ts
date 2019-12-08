import { Inject, Injectable } from "@nestjs/common";
import { WebClient } from '@slack/web-api';

@Injectable()
export class SlackClientService extends WebClient {
  constructor(@Inject('SLACK_TOKEN') slackToken: string) {
    super(slackToken);
  }
}
