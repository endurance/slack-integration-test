import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { ConfigService } from "../config/config.service";
import { createDBOptions } from "./typeorm.config";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      inject: [ConfigService, Logger],
      useFactory: createDBOptions,
    }),
    LoggerModule,
  ],
})
export class DatabaseModule {

}
