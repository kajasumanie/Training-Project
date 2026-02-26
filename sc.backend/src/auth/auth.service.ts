import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async register(user: RegisterUserDto) {
    const existingUser = await this.usersRepository.findOne({ where: { email: user.email } });
    if (existingUser) throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.usersRepository.create({
      email: user.email,
      password: hashedPassword,
      mobile: user.mobile,
    });
    const savedUser = await this.usersRepository.save(newUser);
    const accessToken = this.generateAccessToken(savedUser);
    const refreshToken = this.generateRefreshToken(savedUser);
    return { accessToken, refreshToken };
  }

  async login(userLogin: LoginUserDto) {
    const user = await this.usersRepository.findOne({ where: { email: userLogin.email } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const isMatch = await bcrypt.compare(userLogin.password ?? '', user.password);
    if (!isMatch) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  generateAccessToken(user: User) {
    const payload = { userId: user.id };
    const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET;
    if (!secretKey) {
      throw new Error(`Invalid secret key:${secretKey}`);
    }
    return jwt.sign(payload, secretKey, { expiresIn: '10m' });
  }

  generateRefreshToken(user: User) {
    const payload = { userId: user.id };
    const secretKey = process.env.JWT_REFRESH_TOKEN_SECRET;
    if (!secretKey) {
      throw new Error(`Invalid secret key:${secretKey}`);
    }
    return jwt.sign(payload, secretKey, { expiresIn: '7d' });
  }

  async claimUser(payload: any) {
    const user = await this.usersRepository.findOne({ where: { id: payload.userId } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async validateRefreshToken(refreshToken: string) {
    try {
      const secretKey = process.env.JWT_REFRESH_TOKEN_SECRET;
      if (!secretKey) {
        throw new Error(`Invalid secret key:${secretKey}`);
      }
      const decoded = jwt.verify(refreshToken, secretKey);
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

}
