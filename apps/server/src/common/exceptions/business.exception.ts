import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(
    public readonly errorCode: number,
    public readonly message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super({ code: errorCode, message }, statusCode);
  }
}
