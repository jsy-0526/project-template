import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ERROR_CODES } from '../constants';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request['requestId'];

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception instanceof HttpException
      ? exception.getResponse()
      : null;

    const code = typeof exceptionResponse === 'object' && 'code' in exceptionResponse
      ? (exceptionResponse as any).code
      : (status === HttpStatus.INTERNAL_SERVER_ERROR
          ? ERROR_CODES.SYSTEM.INTERNAL_ERROR.code
          : status);

    const message = typeof exceptionResponse === 'object' && 'message' in exceptionResponse
      ? (exceptionResponse as any).message
      : (exception instanceof HttpException ? exception.message : ERROR_CODES.SYSTEM.INTERNAL_ERROR.message);

    this.logger.error(`[${requestId}] ${message}`, (exception as Error).stack);

    const errorResponse = {
      code,
      message,
      timestamp: Date.now(),
      path: request.url,
      ...(process.env.NODE_ENV !== 'production' && { stack: (exception as Error).stack }),
    };

    response.status(status).json(errorResponse);
  }
}
