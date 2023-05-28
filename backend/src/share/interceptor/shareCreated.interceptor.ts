import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";
import { FiredWebhookDTO } from "src/webhook/dto/FiredWebhookDTO";
import { WebhookService } from "src/webhook/webhook.service";

@Injectable()
export class ShareCreatedInterceptor implements NestInterceptor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly webhookService: WebhookService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(async (x) => {
        const data = await this.prisma.share.findFirst({
          where: { id: x.id },
        });

        this.webhookService.fire(new FiredWebhookDTO().from({
          event: "share-created",
          data,
        }));
      })
    );
  }
}
