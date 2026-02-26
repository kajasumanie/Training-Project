import { Controller, Post, Body, HttpException, HttpStatus, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';

@Controller('api/v1')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() createAuthDto: RegisterUserDto, @Res() res: Response) {
    try {
      const { accessToken, refreshToken } = await this.authService.register(createAuthDto);
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 10 * 60 * 1000
      });
      return res.status(200).send();
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const { accessToken, refreshToken } = await this.authService.login(loginUserDto);
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 10 * 60 * 1000
      });
      return res.status(200).json();
    } catch (error) {
      throw error;
    }
  }

  @Post('refreshToken')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found' });
    }
    try {
      // Validate the refresh token
      const decoded = await this.authService.validateRefreshToken(refreshToken);
      // If valid, generate a new access token
      const user = await this.authService.claimUser(decoded);
      const newAccessToken = this.authService.generateAccessToken(user);
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 10 * 60 * 1000
      });
      return res.status(200).json();
    } catch (error) {
      throw res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.cookie('refresh_token', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    return res.status(204).send();
  }

}
