import { Expose, plainToClass } from "class-transformer";

export class FiredWebhookDTO<T> {
  
  @Expose()
  event: WebhookEvent;

  @Expose()
  data: T;

  from(partial: Partial<FiredWebhookDTO<T>>) {
    return plainToClass(FiredWebhookDTO<T>, partial, { excludeExtraneousValues: true });
  }

  fromList(partial: Partial<FiredWebhookDTO<T>>[]) {
    return partial.map((part) =>
      plainToClass(FiredWebhookDTO<T>, part, { excludeExtraneousValues: true })
    );
  }
}

export type WebhookEvent = "share-created"
