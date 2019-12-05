import { Body, Controller, Post } from "@nestjs/common";

@Controller("/event")
export class EventController {
  
  constructor() {}
  
  @Post("/")
  public async receiveEvent(@Body() body) {
    console.log(body);
  }
}
