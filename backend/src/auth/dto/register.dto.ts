import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequest {
  @ApiProperty({
    example: 'johndoe',
    maxLength: 32,
  })
  @IsString({ message: 'Login must be string' })
  @IsOptional()
  @MaxLength(32, { message: 'Login must not be longer than 32 characters' })
  login?: string;

  @ApiProperty({
    example: 'johndoe@gmail.com',
  })
  @IsString({ message: 'Email must be string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: 'iT}83jk5J',
    minLength: 6,
    maxLength: 128,
  })
  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be longer than 6 characters.' })
  @MaxLength(128, {
    message: 'Password must not be longer than 128 characters.',
  })
  password: string;
}
