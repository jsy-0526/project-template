import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { TIMEOUT_KEY } from '../decorators/timeout.decorator';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly defaultTimeout: number = 30000,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const timeoutMs =
      this.reflector.get<number>(TIMEOUT_KEY, context.getHandler()) ||
      this.defaultTimeout;

    return next.handle().pipe(
      timeout(timeoutMs),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException('请求超时'));
        }
        return throwError(() => err);
      }),
    );
  }
}
