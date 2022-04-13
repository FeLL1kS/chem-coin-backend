import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthorizationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    const { password, ...result } = user['dataValues'];

    return result;
  }

  public async login(user: UserDto) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user: UserDto) {
    const pass = await this.hashPassword(user.password);

    const newUser = await this.usersService.create({ ...user, password: pass });

    const { password, ...result } = newUser['dataValues'];

    const token = await this.generateToken(result);

    return { user: result, token };
  }

  private async comparePassword(password: string, dbPassword: string) {
    const match = await bcrypt.compare(password, dbPassword);
    return match;
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async generateToken(user: UserDto) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }
}
