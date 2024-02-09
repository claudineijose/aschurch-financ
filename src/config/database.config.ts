import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: this.configService.get<string>('database.host'),
      port:
        parseInt(this.configService.get<string>('database.port'), 10) || 3001,
      username: this.configService.get<string>('database.user'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.name'),
      options: {
        encrypt: false,
      },
      synchronize: true,
      logging: this.configService.get<string>('database.logging') === 'true',
      entities: ['dist/**/**/*.entity.{ts,js}'],
    };
  }
}
