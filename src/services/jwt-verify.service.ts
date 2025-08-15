import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { TokenData } from '@/models/types/token-data.type';

@Injectable()
export class JwtVerifyService {
  private readonly JWT_SECRET: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.JWT_SECRET = this.configService.getOrThrow('JWT_SECRET');
  }

  async handle(token: string): Promise<TokenData> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);

      return decoded as TokenData;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
