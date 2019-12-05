import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './main-app.module';

async function bootstrap() {
  const app = await NestFactory.create(MainAppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
