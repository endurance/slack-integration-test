import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { mainPath } from '../directory';
import { Logger } from '@nestjs/common';
import { ConfigService } from "../config/config.service";

export const createDBOptions = async (service: ConfigService, logger?: Logger) => {
  let config = {
    type: await service.get('DB_TYPE'),
    schema: await service.get('DB_SCHEMA') || 'public',
    host: await service.get('DB_HOST'),
    port: await service.get('DB_PORT'),
    username: await service.get('DB_USER'),
    password: await service.get('DB_PASSWORD'),
    database: await service.get('DB'),
    entities: [mainPath + '/db/**/*.entity{.ts,.js}'],
    migrations: [mainPath + '/db/migrations/*{.ts,.js}'],
    synchronize: await service.get('SYNCHRONIZE') === 'true',
    logging: await service.get('LOGGING') === 'true',
  };

  if (service.isDeployedEnv()) {
    config = {
      ...config,
      port: null,
      // @ts-ignore
      extra: {
        socketPath: `/cloudsql/${await service.get('DB_SOCKET')}`,
      },
      host: `/cloudsql/${await service.get('DB_SOCKET')}`,
    };
  }

  // Do not set to true, synchronize will match production to these entities.
  if (service.isDeployedEnv() && config.synchronize === true) {
    throw new Error('SYNCHRONIZE should NEVER be true for Rigup Rails Database.');
  }

  if (!service.isDeployedEnv() && logger) {
    logger.log(config.database, 'DatabaseConfiguration');
    logger.log(`Synchronize? ${config.synchronize}`, 'DatabaseConfiguration');
    logger.log(`Logging? ${config.logging}`, 'DatabaseConfiguration');
  }

  return config as TypeOrmModuleOptions;
};
