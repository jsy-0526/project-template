import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EmailProducer {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  async sendEmail(to: string, subject: string, content: string) {
    await this.emailQueue.add('send', { to, subject, content }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
    });
  }
}
