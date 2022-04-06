import { Controller, Get, Query } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';

@Controller('authorization')
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {}

  @Get()
  async auth(
    @Query('paspnumber') paspnumber,
    @Query('studnumber') studnumber,
  ): Promise<boolean> {
    if (!(paspnumber && studnumber)) {
      return false;
    }

    return this.authorizationService.checkUser(paspnumber, studnumber);
  }
}
