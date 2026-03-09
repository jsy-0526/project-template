import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserRegisteredListener } from './listeners/user-registered.listener';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      maxListeners: 10,
    }),
  ],
  providers: [UserRegisteredListener],
})
export class EventsModule {}
