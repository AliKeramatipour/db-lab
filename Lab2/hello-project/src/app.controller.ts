import { Controller, Request, Post, Header } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/custom-decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @Header('Content-Type', 'application/json')
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req);
  }

  // @ApiBearerAuth()
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}