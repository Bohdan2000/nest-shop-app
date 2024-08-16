import { applyDecorators } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NATS_CRM, natsRoute } from '../nats.helper';

export function NatsEvent(
  parts: string | string[],
  baseName: string = NATS_CRM,
) {
  return applyDecorators(EventPattern(natsRoute(parts, baseName)));
}
