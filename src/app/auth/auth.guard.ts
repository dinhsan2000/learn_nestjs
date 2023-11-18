import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Reflector} from "@nestjs/core";
import {Request} from "express";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(await token, {
        secret: this.configService.get<string>('JWT_SECRET')
      });
      return request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractToken(request: Request): string {
    const bearerToken = request.headers.authorization;

    if (!bearerToken) {
      return null;
    }
    const token = bearerToken.split(' ')[1];
    if (!token) {
      return null;
    }
    return token;
  }
}
