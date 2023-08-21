import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response, @Body() _: LoginDto) {
    const { access_token } = await this.authService.login(req.user);
    // res.cookie('jwt', access_token, {
    //   httpOnly: true,
    //   sameSite: 'lax',
    //   secure: process.env.NODE_ENV === 'production',
    //   path: '/',
    //   maxAge: 3600,
    // });
    res.send({ token: access_token, user: req.user });
  }
}
