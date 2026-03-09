import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../../entities/user.entity';
import { InvalidCredentialsException } from '../../common/exceptions';
import { AuditLogService, AuditAction } from '../../common/logger';
import { UserRegisteredEvent } from '../../events/events';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private auditLogService: AuditLogService,
    private eventEmitter: EventEmitter2,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(email: string, password: string, name?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword, name });
    await this.userRepository.save(user);

    this.auditLogService.log({
      action: AuditAction.USER_REGISTER,
      userId: user.id,
      metadata: { email },
    });

    this.eventEmitter.emit('user.registered', new UserRegisteredEvent(user.id, user.email));

    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new InvalidCredentialsException();
    }

    this.auditLogService.log({
      action: AuditAction.USER_LOGIN,
      userId: user.id,
      metadata: { email },
    });

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload), userId: user.id };
  }
}
