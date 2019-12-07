import { anything, instance, mock, verify } from "ts-mockito";
import { SlackClientService } from "../../services/slack-client.service";
import { UserService } from "../../services/user.service";
import { EventsGateway } from "../../ws-gateway/event.gateway";
import { EventController, SlackEvent } from "./event.controller";
import { plainToClass } from "class-transformer";

describe('EventController Unit Test', () => {
  it('should emit userChanged event on successful user_change slack event', async () => {
    const slackClient = instance(mock(SlackClientService));
    const userService = instance(mock(UserService));
    const eventGatewayMock = mock(EventsGateway);
    const eventGateway = instance(eventGatewayMock);
    
    const eventController = new EventController(slackClient, userService, eventGateway);
    const slackEvent = plainToClass(SlackEvent, {
      event: {
        type: 'user_change'
      }
    });
    
    await eventController.receive(slackEvent);
  
    verify(eventGatewayMock.userChanged(anything())).called();
  });
});
