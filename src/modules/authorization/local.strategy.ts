import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthorizationService } from './authorization.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authorizationService: AuthorizationService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authorizationService.validateUser(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    return user;
  }
}
