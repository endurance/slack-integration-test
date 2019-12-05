import { Module } from '@nestjs/common';
import { EventController } from "./controllers/event.controller";

@Module({
  imports: [],
  controllers: [EventController]
})
export class SlackModule {}
