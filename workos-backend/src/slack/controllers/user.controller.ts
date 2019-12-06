import { Body, Controller, Get, Post } from "@nestjs/common";
import { SlackClientService } from "../services/slack-client.service";
import { plainToClass } from "class-transformer";
import { UserEntity } from "../../db/entities/user.entity";
import { UserService } from "../services/user.service";

interface SlackEvent {
  token: string,
  challenge: string,
  type: string,
}

@Controller("/slack")
export class UserController {
  
  constructor(
    private readonly _userService: UserService,
  ) {}
  
  @Post("/sync")
  public async syncUsers(@Body() body: SlackEvent) {
    return await this._userService.syncUsers();
  }
  
  @Get('/list')
  public async getUsers() {
    return this._userService.getUsers();
  }
  
}
