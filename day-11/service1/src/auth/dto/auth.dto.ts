import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @ApiProperty({ example: 'isai@gmail.com', description: 'The email of the user' })
  email: string;
  @IsString()
  @ApiProperty({ example: 'MyRandomPassword', description: 'The password of the user' })
  password: string;
}
