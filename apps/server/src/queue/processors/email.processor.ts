import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('email')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);

  @Process('send')
  async handleSendEmail(job: Job) {
    this.logger.log(`Processing email job ${job.id}`);
    const { to, subject, content } = job.data;

    // TODO: 实际邮件发送逻辑
    this.logger.log(`Sending email to ${to}: ${subject}`);

    return { success: true };
  }
}
