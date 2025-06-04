import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'Isai', description: 'The name of the user' })
  name: string;
  @IsString()
  @ApiProperty({ example: 'isai@gmail.com', description: 'The email of the user' })
  email: string;
  @IsString()
  @ApiProperty({ example: 'MyRandomPassword', description: 'The password of the user' })
  password: string;
  refreshToken?: string;
}
