import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

import { JwtVerifyService } from '@/services/jwt-verify.service';
import { TokenData } from '@/models/types/token-data.type';
import { UsersRepository } from '@/modules/users/repository/users.repository';
import { PublicRoute } from '@/decorators/public-route.decorator';
import { AppLoggerService } from '@/utils/app-logger/app-logger.service';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtVerifyService)
    private readonly jwtVerifyService: JwtVerifyService,
    @Inject(Reflector)
    private readonly reflector: Reflector,
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly logger: AppLoggerService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    const isBearer = type === 'Bearer';

    if (!isBearer || !token) {
      this.logger.error('Invalid token');
      throw new UnauthorizedException();
    }

    return token;
  }

  private async validateTokenData(tokenData: TokenData) {
    const user = await this.usersRepository.find({ id: tokenData.id });

    if (!user || user.deletedAt) {
      this.logger.error('User not found');
      throw new UnauthorizedException();
    }
  }

  private async verifyToken(token: string) {
    const tokenData = await this.jwtVerifyService.handle(token);

    await this.validateTokenData(tokenData);

    return tokenData;
  }

  private injectTokenData(context: ExecutionContext, tokenData: TokenData) {
    const request = context.switchToHttp().getRequest();
    request.user = tokenData;
  }

  private isPublicRoute(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PublicRoute, [
      context.getHandler(),
      context.getClass(),
    ]);

    return !!isPublic;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (this.isPublicRoute(context)) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    const tokenData = await this.verifyToken(token);

    this.injectTokenData(context, tokenData);

    return true;
  }
}
