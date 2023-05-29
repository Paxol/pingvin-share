import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { PrismaService } from "src/prisma/prisma.service";
import { FiredWebhookDTO } from "./dto/FiredWebhookDTO";
import { User } from "@prisma/client";
import { CreateWebhookDTO } from "./dto/CreateWebhookDTO";

@Injectable()
export class WebhookService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService
  ) {}

  async create(dto: CreateWebhookDTO, user: User) {
    return await this.prisma.webhook.create({
      data: {
        ...dto,
        creator: { connect: { id: user.id } },
      },
    });
  }

  async fire(dto: FiredWebhookDTO<any>) {
    const hooks = await this.prisma.webhook.findMany({
      where: { event: dto.event },
    });

    for (const webhook of hooks) {      
      this.httpService
        .post(webhook.url, dto.data ?? undefined, {
          headers: {
            "x-webhook-secret": webhook.secret
          }
        })
        .subscribe()
    }
  }
}
