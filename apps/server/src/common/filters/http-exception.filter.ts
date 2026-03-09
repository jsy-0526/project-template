import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request['requestId'];
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      code: typeof exceptionResponse === 'object' && 'code' in exceptionResponse
        ? (exceptionResponse as any).code
        : status,
      message: typeof exceptionResponse === 'object' && 'message' in exceptionResponse
        ? (exceptionResponse as any).message
        : exception.message,
      timestamp: Date.now(),
      path: request.url,
    };

    this.logger.error(`[${requestId}] ${errorResponse.message}`);

    response.status(status).json(errorResponse);
  }
}
