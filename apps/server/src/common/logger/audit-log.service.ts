import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger.service';

export enum AuditAction {
  USER_LOGIN = 'USER_LOGIN',
  USER_REGISTER = 'USER_REGISTER',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  OAUTH_CONNECT = 'OAUTH_CONNECT',
  PROJECT_CREATE = 'PROJECT_CREATE',
  PROJECT_DELETE = 'PROJECT_DELETE',
}

interface AuditLogData {
  action: AuditAction;
  userId?: string;
  requestId?: string;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class AuditLogService {
  constructor(private readonly logger: LoggerService) {}

  log(data: AuditLogData) {
    this.logger.logWithContext('info', `[AUDIT] ${data.action}`, {
      ...data,
      timestamp: new Date().toISOString(),
    });
  }
}
