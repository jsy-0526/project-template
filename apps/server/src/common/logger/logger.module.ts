import { Module, Global } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { AuditLogService } from './audit-log.service';

@Global()
@Module({
  providers: [LoggerService, AuditLogService],
  exports: [LoggerService, AuditLogService],
})
export class LoggerModule {}
