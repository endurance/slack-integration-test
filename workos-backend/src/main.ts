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
  await user.syncUsers();
  await app.listen(port || 8080);
}

bootstrap();
