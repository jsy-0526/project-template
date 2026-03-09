import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger';
import { AllExceptionFilter } from './common/filters';
import { TransformInterceptor, LoggingInterceptor, TimeoutInterceptor } from './common/interceptors';
import { ValidationPipe } from './common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(LoggerService);
  app.useLogger(logger);

  const reflector = app.get(Reflector);

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TimeoutInterceptor(reflector),
    new TransformInterceptor(),
  );
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  await app.listen(3001);
  logger.log('Application is running on: http://localhost:3001', 'Bootstrap');
}
bootstrap();
