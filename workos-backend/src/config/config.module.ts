import { Module } from "@nestjs/common";
import { ConfigOptions, ConfigService } from "./config.service";

const configOptions = new ConfigOptions();
configOptions.protectedKeys = ['DB_PASSWORD', 'SLACK_TOKEN'];

@Module({
  imports: [],
  providers: [
    {
      provide: "CONFIG_OPTIONS",
      useValue: configOptions,
    },
    ConfigService,
  ],
  exports: [ConfigService],
})
export class ConfigModule {
}
