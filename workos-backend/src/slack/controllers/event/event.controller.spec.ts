import { anything, instance, mock, verify } from "ts-mockito";
import { SlackClientService } from "../../services/slack-client-service/slack-client.service";
import { UserService } from "../../services/user-service/user.service";
import { EventsGateway } from "../../ws-gateway/event.gateway";
import { EventController, SlackEvent } from "./event.controller";
import { plainToClass } from "class-transformer";
import { Logger } from "@nestjs/common";

describe('EventController Unit Test', () => {
  let eventGatewayMock;
  let controllerInstanceToTest: EventController;
  beforeEach(() => {
    const slackClient = instance(mock(SlackClientService));
    const userService = instance(mock(UserService));
    eventGatewayMock = mock(EventsGateway);
    const eventGateway = instance(eventGatewayMock);
    const logger = instance(mock(Logger));
  
    controllerInstanceToTest = new EventController(slackClient, userService, eventGateway, logger);
  });
  
  it('should emit userChanged event on successful user_change slack event', async () => {
    const slackEvent = plainToClass(SlackEvent, {
      event: {
        type: 'user_change'
      }
    });
    
    await controllerInstanceToTest.receive(slackEvent);
    // Ensure that the gateway calls userChanged which tests Socket Update functionality passively
    // A more direct test would be a way to do this end to end with a test slack workspace
    verify(eventGatewayMock.userChanged(anything())).called();
  });
  
  it('should return the challenge if the body includes a challenge', async () => {
    const slackEvent = plainToClass(SlackEvent, {
      challenge: '1234'
    });
    const challengeResponse = await controllerInstanceToTest.receive(slackEvent);
    expect(challengeResponse).toBe('1234');
  });
  
});
