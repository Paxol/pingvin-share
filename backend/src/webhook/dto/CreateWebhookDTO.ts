import { PickType } from "@nestjs/swagger";
import { WebhookDTO } from "./WebhookDTO";

export class CreateWebhookDTO extends PickType(WebhookDTO, ["event", "url"] as const) {}
