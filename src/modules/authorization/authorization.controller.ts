import {
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Body,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DoesStudNumberValid } from 'src/core/guards/doesStudCredsValid.guard';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import { UserDto } from '../users/dto/user.dto';
import { AuthorizationService } from './authorization.service';

@Controller('authorization')
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authorizationService.login(req.user);
  }

  @UseGuards(DoesUserExist, DoesStudNumberValid)
  @Post('signup')
  async signup(@Body() user: UserDto) {
    return await this.authorizationService.create(user);
  }
}
