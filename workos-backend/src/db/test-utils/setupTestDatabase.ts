import { Test, TestingModule } from "@nestjs/testing";
import { Connection } from "typeorm";
import { ModuleMetadata } from "@nestjs/common/interfaces";
import { DatabaseModule } from "../database.module";
import { getConnectionToken } from "@nestjs/typeorm";

export interface TestPackage {
  module: TestingModule;
  connection: Connection;
}

export const setupTestDatabase = async ({imports = [], providers = []}: Partial<ModuleMetadata>) => {
  const module = await Test.createTestingModule({
    imports: [DatabaseModule, ...imports],
    providers: [...providers],
  }).compile();
  const connection = module.get<Connection>(getConnectionToken());
  return {
    module: module as TestingModule,
    connection,
  } as TestPackage;
};
