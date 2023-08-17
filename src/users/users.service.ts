import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  private generateRandomHash(length: number = 6): string {
    return crypto.randomBytes(length).toString('hex');
  }

  generateReconstruireId(): string {
    const currentYear = new Date().getFullYear();
    const hash = this.generateRandomHash();
    return `${currentYear}.${hash}`;
  }
}
