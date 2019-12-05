import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Inject, Injectable } from '@nestjs/common';
import { Datastore } from '@google-cloud/datastore';

export class ConfigOptions {
  filePath: string;
  protectedKeys: string[];
}

@Injectable()
export class ConfigService {
  private readonly envPath = `${process.env.NODE_ENV || 'development'}.env`;
  private readonly envConfig: Record<string, string>;
  private readonly protectedKeys: string[] = [];
  private readonly datastore: Datastore;

  constructor(@Inject('CONFIG_OPTIONS') options= new ConfigOptions()) {
    const { filePath, protectedKeys } = options;
    if (filePath) {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    } else {
      this.envConfig = dotenv.parse(fs.readFileSync(this.envPath));
    }
    this.datastore = new Datastore({ namespace: this.getSync('ENV_SECRET_NAMESPACE') });
    this.protectedKeys = protectedKeys || [];
  }

  async get(key: string) {
    if (this.protectedKeys.includes(key) && this.isDeployedEnv()) {
      const value = await this._getProtectedValue(key);
      if (!value) {
        throw new Error(`MISSING SETTING KEY: ${key}\n Talk to your Team Lead to set this value in the secret datastore.`);
      }
      return value;
    }
    return this.envConfig[key];
  }

  public getSync = (key: string) => {
    return this.envConfig[key];
  }

  public getEnv = () => {
    return process.env.NODE_ENV || 'development';
  }

  public isNotProduction = () => {
    return this.getEnv() !== 'production';
  }

  public isProduction = () => {
    return this.getEnv() === 'production';
  }

  public isStaging = () => {
    return this.getEnv() === 'staging';
  }

  public isNotStaging = () => {
    return !this.isStaging();
  }

  public isDeployedEnv = () => {
    return this.isProduction() || this.isStaging();
  }

  public isNotDeployedEnv = () => {
    return !this.isDeployedEnv();
  }

  public isDevelopmentEnv = () => {
    return this.getEnv() === 'development';
  }

  public isNotDevelopmentEnv = () => {
    return !this.isDevelopmentEnv();
  }

  public isTestingEnv = () => {
    return this.getEnv() === 'test';
  }

  public isNotTestingEnv = () => {
    return !this.isTestingEnv();
  }

  private async _getProtectedValue(name) {
    // The kind for the new entity
    const kind = await this.get('ENV_SECRET_KIND');
    const companyQuery = this.datastore.createQuery(kind);
    const env = this.getEnv();
    // Only retrieve the name property.
    const [entity] = await companyQuery
      .filter('ENV', env)
      .run();
    const [entityValue] = entity;
    return entityValue[name];
  }
}
