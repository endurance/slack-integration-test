import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './main-app.module';
import { ConfigService } from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(MainAppModule);
  app.enableCors();
  const cfg = app.get<ConfigService>(ConfigService);
  const port = cfg.getSync('PORT');
  await app.listen(port || 8080);
}

bootstrap();
