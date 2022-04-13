import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { JSDOM } from 'jsdom';
import { Observable } from 'rxjs';
import { UsersService } from '../../modules/users/user.service';

@Injectable()
export class DoesStudNumberValid implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const { paspnumber, studnumber } = request.body;

    const url = `https://www.isuct.ru/student/rating/view?paspnumber=${paspnumber}&studnumber=${studnumber}`;

    const response: AxiosResponse<string, any> = await axios.get(url);

    const dom = new JSDOM(response.data);

    const userExist = !dom.window.document
      .getElementById('block-system-main')
      .innerHTML.includes('Результатов нет!');

    if (!userExist) {
      throw new ForbiddenException(
        'The user with this paspnumber and studnumber does not exist',
      );
    }

    return true;
  }
}
