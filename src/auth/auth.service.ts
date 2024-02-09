import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepo: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.authRepo.findOne({
      where: {
        Username: username,
        Senha: password,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.Id, username: user.Username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
