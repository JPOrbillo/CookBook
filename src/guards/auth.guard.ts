import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/customDecorators/isPublic.decorator';
import { Reflector } from '@nestjs/core';
//this is an auth guard for all routes when logged in.
//it checks if the user is logged in and has a valid token
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const [type, token] = request.headers.authorization?.split(' ') ?? []; //removes the "Bearer" part of the token to be able to verify it with the secret key

    if (!authHeader || !token || type !== 'Bearer') {
      throw new UnauthorizedException('No token provided');
    }

    if (token) {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('SECRET_KEY'),
      });
      request.user = decoded; // Attach the decoded token to the request object
      return true;
    }

    return false;
  }
}
