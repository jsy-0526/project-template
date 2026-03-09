import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { LoggerModule } from './common/logger';
import { CacheModule } from './cache/cache.module';
import { QueueModule } from './queue/queue.module';
import { EventsModule } from './events/events.module';
import { databaseConfig, appConfig, jwtConfig, redisConfig, configValidationSchema } from './config';
import { RequestIdMiddleware, LoggerMiddleware } from './common/middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, redisConfig, databaseConfig],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig(),
    }),
    LoggerModule,
    CacheModule,
    QueueModule,
    EventsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware, LoggerMiddleware).forRoutes('*');
  }
}
