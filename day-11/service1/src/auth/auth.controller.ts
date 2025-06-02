import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from '../common/decorator/decorator.auth_user';
import { AccessTokenGuard } from '../common/guards/guard.access_token';
import { RefreshTokenGuard } from '../common/guards/guard.refresh_token';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create_user.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@AuthUser('sub') sub: string) {
    return this.authService.logout(sub);
  }
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(
    @AuthUser('sub') sub: string,
    @AuthUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(sub, refreshToken);
  }
}
