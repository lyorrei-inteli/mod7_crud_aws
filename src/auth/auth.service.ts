/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role, User } from '@prisma/client';
import { SignupDto } from './dtos/signup.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private usersService: UsersService,
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

  async login(user: User) {
    const payload = {
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: SignupDto) {
    // check if user already exists
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    const newUser = await this.prismaService.user.create({
      data: {
        email: user.email,
        password: hash,
        roles: [Role.Nurse],
        firstName: user.firstName,
        lastName: user.lastName,
        reconstruireId: this.usersService.generateReconstruireId(),
      },
    });
    return newUser;
  }
}
