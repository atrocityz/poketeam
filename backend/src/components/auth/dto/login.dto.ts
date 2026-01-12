import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'User email address',
  })
  @IsString({ message: 'Email must be string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: 'iT}83jk5J',
    minLength: 6,
    maxLength: 128,
    description: 'User password',
  })
  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be longer than 6 characters.' })
  @MaxLength(128, {
    message: 'Password must not be longer than 128 characters.',
  })
  password: string;
}
