import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { INatsConfig } from '../config';
import { CashPointController } from './controller/nats.controller';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'nats',
          inject: [ConfigService],
          useFactory: (config: ConfigService): INatsConfig =>
            config.getOrThrow<INatsConfig>('nats'),
        },
      ],
    }),
  ],
  providers: [],
  exports: [],
  controllers: [CashPointController],
})
export class NatsModule {}
