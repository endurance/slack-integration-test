import { Module } from "@nestjs/common";
import { ConfigService } from "./config.service";

@Module({
  imports: [],
  providers: [
    {
      provide: "CONFIG_OPTIONS",
      useValue: {},
    },
    ConfigService,
  ],
  exports: [ConfigService],
})
export class ConfigModule {
}
