import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context) {
    // Adicione a validação JWT padrão primeiro
    const valid = await super.canActivate(context);
    if (!valid) {
      throw new UnauthorizedException('Invalid token');
    }

    // Agora verifique as roles
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRoles = request.user.roles;

    const hasRole = userRoles.some((role: string) => roles.includes(role));

    if (hasRole) {
      return true;
    }

    throw new UnauthorizedException('Insufficient role');
  }
}
