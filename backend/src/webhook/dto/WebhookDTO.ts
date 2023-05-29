import { Expose, Type, plainToClass } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { PublicUserDTO } from "src/user/dto/publicUser.dto";

export class WebhookDTO {
  @Expose()
  id: string;

  @Expose()
  @IsNotEmpty()
  event: string;

  @Expose()
  @IsNotEmpty()
  url: string;

  @Expose()
  @IsOptional()
  secret: string | undefined;

  @Expose()
  @Type(() => PublicUserDTO)
  creator: PublicUserDTO;

  from(partial: Partial<WebhookDTO>) {
    return plainToClass(WebhookDTO, partial, { excludeExtraneousValues: true });
  }

  fromList(partial: Partial<WebhookDTO>[]) {
    return partial.map((part) =>
      plainToClass(WebhookDTO, part, { excludeExtraneousValues: true })
    );
  }
}
