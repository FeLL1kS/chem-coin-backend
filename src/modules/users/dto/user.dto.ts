import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly surname: string;

  @IsNotEmpty()
  readonly paspnumber: string;

  @IsNotEmpty()
  readonly studnumber: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
