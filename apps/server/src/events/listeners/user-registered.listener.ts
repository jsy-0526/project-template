import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../events/user-registered.event';

@Injectable()
export class UserRegisteredListener {
  private readonly logger = new Logger(UserRegisteredListener.name);

  @OnEvent('user.registered')
  handleUserRegisteredEvent(event: UserRegisteredEvent) {
    this.logger.log(`User registered: ${event.email} (ID: ${event.userId})`);
    // TODO: 发送欢迎邮件等操作
  }
}
