import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Request');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body } = req;
    const requestId = req['requestId'];
    const traceId = req['traceId'];
    const userId = req.user?.sub || req.user?.id;
    const now = Date.now();

    this.logger.log(`[${requestId}] [${traceId}] ${userId ? `[User:${userId}]` : ''} ${method} ${url}`);

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - now;
          this.logger.log(
            `[${requestId}] ${method} ${url} - ${duration}ms`,
          );
        },
        error: (error) => {
          const duration = Date.now() - now;
          this.logger.error(
            `[${requestId}] ${method} ${url} - Error: ${duration}ms - ${error.message}`,
          );
        },
      }),
    );
  }
}
