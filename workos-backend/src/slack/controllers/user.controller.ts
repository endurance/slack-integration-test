import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "../services/user.service";

interface SlackEvent {
  token: string,
  challenge: string,
  type: string,
}

@Controller("/user")
export class UserController {
  
  constructor(
    private readonly _userService: UserService,
  ) {}
  
  @Post("/sync")
  public async syncUsers(@Body() body: SlackEvent) {
    return await this._userService.syncUsers();
  }
  
  @Get("/list")
  public async getUsers() {
    const users = await this._userService.getUsers();
    if (!users || users.length === 0) {
      return await this._userService.syncUsers();
    }
    return users;
  }
  
}
