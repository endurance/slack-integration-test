import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { ConfigService } from "../config/config.service";
import { createDBOptions } from "./typeorm.config";
import { ConfigModule } from "../config/config.module";
import { MigrationService } from "./services/migration.service";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      inject: [ConfigService, Logger],
      useFactory: createDBOptions,
    }),
    LoggerModule,
  ],
  providers: [MigrationService]
})
export class DatabaseModule {
}
