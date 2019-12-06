import { Module } from '@nestjs/common';
import { EventController } from "./controllers/event.controller";
import { ConfigService } from "../config/config.service";
import { SlackClientService } from "./services/slack-client.service";
import { ConfigModule } from "../config/config.module";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../db/entities/user.entity";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [EventController, UserController],
  providers: [{
    provide: 'SLACK_TOKEN',
    useFactory: async (configService: ConfigService) => {
      return await configService.get('SLACK_TOKEN');
    },
    inject: [ConfigService]
  },
    SlackClientService,
    UserService,
  ]
})
export class SlackModule {}
