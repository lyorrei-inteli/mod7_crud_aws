/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: SignupDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    const newUser = await this.prismaService.user.create({
      data: {
        email: user.email,
        password: hash,
        roles: [Role.USER],
        name: user.name,
      },
    });
    return newUser;
  }
}
