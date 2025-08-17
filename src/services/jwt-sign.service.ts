import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtSignService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRATION_TIME: number;

  constructor(private readonly configService: ConfigService) {
    this.JWT_SECRET = this.configService.getOrThrow('JWT_SECRET');
    this.JWT_EXPIRATION_TIME = this.configService.getOrThrow<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async handle(payload: any) {
    const token = jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRATION_TIME,
    });

    return token;
  }
}
