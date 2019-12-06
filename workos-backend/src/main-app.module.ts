import { Module } from '@nestjs/common';
import { DatabaseModule } from "./db/database.module";
import { SlackModule } from "./slack/slack.module";

@Module({
  imports: [
    DatabaseModule,
    SlackModule,
  ],
})
export class MainAppModule {}
