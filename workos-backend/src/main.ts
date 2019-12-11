import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './main-app.module';
import { ConfigService } from "./config/config.service";
import { MigrationService } from "./db/services/migration.service";
import { UserService } from "./slack/services/user-service/user.service";

async function bootstrap() {
  const app = await NestFactory.create(MainAppModule);
  app.enableCors();
  const cfg = app.get<ConfigService>(ConfigService);
  const port = cfg.getSync('PORT');
  
  const migration = app.get<MigrationService>(MigrationService);
  await migration.execute();
  
  const user = app.get<UserService>(UserService);
  // Do initial sync of workspace data
  // I could set this up to be syncing from the front end, but I don't particularly like that.
  // 1. Generally speaking, i want to avoid letting a client instruct the backend on periodic db work
  // 2. Given the project, this satisfies the requirements well enough to demonstrate the experience,
  // but it isn't "perfect" because this sync only happens once. (Technically once per deployment - whenever
  // the app starts up the first time)
  
  await user.syncUsers();
  await app.listen(port || 8080);
}

bootstrap();
