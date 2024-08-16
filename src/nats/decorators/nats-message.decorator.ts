import { applyDecorators } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NATS_CRM, natsRoute } from '../nats.helper';

export function NatsMessage(
  parts: string | string[],
  baseName: string = NATS_CRM,
) {
  return applyDecorators(MessagePattern(natsRoute(parts, baseName)));
}
