import { Controller, Request, Post, UseGuards, Get, Query, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller("/auth")
export class AuthController {

  constructor(private authService: AuthService) {}

  @Get("/verify")
  verify(@Query("hash") hash: string) {
    return this.authService.verifyUser(hash)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }


  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    console.log(req.user)
    return req.user;
  }
}