import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailProcessor } from './processors/email.processor';
import { EmailProducer } from './producers/email.producer';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6380),
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  providers: [EmailProcessor, EmailProducer],
  exports: [EmailProducer],
})
export class QueueModule {}
