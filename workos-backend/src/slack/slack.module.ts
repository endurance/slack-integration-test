import { Module } from '@nestjs/common';
import { EventController } from "./controllers/event/event.controller";
import { ConfigService } from "../config/config.service";
import { SlackClientService } from "./services/slack-client.service";
import { ConfigModule } from "../config/config.module";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../db/entities/user.entity";
import { LoggerModule } from "../logger/logger.module";
import { EventsGateway } from "./ws-gateway/event.gateway";
import { SlackController } from "./controllers/slack.controller";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity]),
    LoggerModule,
  ],
  controllers: [EventController, UserController, SlackController],
  providers: [{
    provide: 'SLACK_TOKEN',
    useFactory: async (configService: ConfigService) => {
      return await configService.get('SLACK_TOKEN');
    },
    inject: [ConfigService]
  },
    SlackClientService,
    UserService,
    EventsGateway,
  ]
})
export class SlackModule {}
