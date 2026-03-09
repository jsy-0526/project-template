import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../dto';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDto<T>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map(data => new ResponseDto(200, 'success', data, request.url))
    );
  }
}
