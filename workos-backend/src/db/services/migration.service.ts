import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "../../config/config.service";


@Injectable()
export class MigrationService {
  
  constructor(
    @InjectConnection()
    private readonly _db: Connection,
    private readonly _cfgService: ConfigService,
  ) {}
  
  async execute() {
    if (this._cfgService.isProduction()){
      return await this._db.runMigrations();
    }
  }
  
}
