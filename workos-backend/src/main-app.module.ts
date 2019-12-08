import { Module } from "@nestjs/common";
import { DatabaseModule } from "./db/database.module";
import { SlackModule } from "./slack/slack.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    DatabaseModule,
    SlackModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "build"),
    }),
  ],
})
export class MainAppModule {
}
