import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { WebhookService } from "./webhook.service";
import { WebhookDTO } from "./dto/WebhookDTO";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator/getUser.decorator";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import * as argon from "argon2";
import { ApiCookieAuth } from "@nestjs/swagger";
import { CreateWebhookDTO } from "./dto/CreateWebhookDTO";

@Controller("webhooks")
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}
  
  @Get()
  async get() {
    return argon.hash("adminadmin")
  }
  
  @ApiCookieAuth()
  @Post("create")
  @UseGuards(JwtGuard)
  async create(
    @Body() hook: CreateWebhookDTO, 
    @GetUser() user: User) {    
    return new WebhookDTO().from(await this.webhookService.create(hook, user));
  }
}
