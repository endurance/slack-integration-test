import { Controller, Get } from "@nestjs/common";

@Controller("/auth")
export class EventController {
  
  constructor() {}
  
  @Get("/")
  public async challenge() {
    return "Hello";
  }
}
