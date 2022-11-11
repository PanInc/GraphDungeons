import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST') || 'localhost',
      port: this.configService.get('DB_PORT') || 5432,
      username: this.configService.get('DB_USERNAME') || 'postgres',
      password: this.configService.get('DB_PASSWORD') || 'root',
      database: this.configService.get('DB') || 'dev',
      entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],

      synchronize: true
    };
  }
}