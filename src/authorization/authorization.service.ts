import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { JSDOM } from 'jsdom';

@Injectable()
export class AuthorizationService {
  constructor() {
    //
  }

  public async checkUser(paspnumber: string, studnumber: string): Promise<any> {
    const url = `https://www.isuct.ru/student/rating/view?paspnumber=${paspnumber}&studnumber=${studnumber}`;

    const response: AxiosResponse<string, any> = await axios.get(url);

    const dom = new JSDOM(response.data);

    const isUserExist = !dom.window.document
      .getElementById('block-system-main')
      .innerHTML.includes('Результатов нет!');

    return isUserExist;
  }
}
