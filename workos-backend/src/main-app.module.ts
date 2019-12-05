import { Module } from '@nestjs/common';
import { DatabaseModule } from "./db/database.module";
import { EventController } from "./slack/controllers/event.controller";

@Module({
  imports: [
    DatabaseModule,
    EventController,
  ],
})
export class MainAppModule {}
