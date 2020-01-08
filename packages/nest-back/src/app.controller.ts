import { Controller, Get, Request, Response, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { SetCookies, CookieOptions } from '@nestjsplus/cookies';
import { AuthService } from './auth/auth.service';
import { sign } from 'jsonwebtoken';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
  ) {}

  // @Get('*')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseGuards(AuthGuard('local'))
  // @SetCookies({ httpOnly: true })
  @Post('auth/login')
  async login(@Request() req) {

    const expiresInCookie = process.env.DB_ENV === 'test' ? 60000 : 172800000;
    const expiresInJwt = process.env.DB_ENV === 'tes' ? '1m' : '2d';
    const secretKey = process.env.JWT_SECRET || 'VerySecret$$2020@@';
    const jwt = await sign(req.user, secretKey, {
      expiresIn: expiresInJwt,
    });
    req.res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + expiresInCookie),
    });
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
