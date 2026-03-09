import { HttpStatus } from '@nestjs/common';
import { BusinessException } from './business.exception';
import { ERROR_CODES } from '../constants';

export class AuthException extends BusinessException {
  constructor(errorCode: number, message: string) {
    super(errorCode, message, HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidCredentialsException extends AuthException {
  constructor() {
    super(ERROR_CODES.AUTH.INVALID_CREDENTIALS.code, ERROR_CODES.AUTH.INVALID_CREDENTIALS.message);
  }
}

export class TokenExpiredException extends AuthException {
  constructor() {
    super(ERROR_CODES.AUTH.TOKEN_EXPIRED.code, ERROR_CODES.AUTH.TOKEN_EXPIRED.message);
  }
}

export class TokenInvalidException extends AuthException {
  constructor() {
    super(ERROR_CODES.AUTH.TOKEN_INVALID.code, ERROR_CODES.AUTH.TOKEN_INVALID.message);
  }
}
