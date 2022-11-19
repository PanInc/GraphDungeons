import {  Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@config';
import { StudentModule } from '@modules/student';
import { ProfessorModule } from '@modules/professor';
import { DungeonModule } from './modules/dungeon/dungeon.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from '@guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService
    }),
    StudentModule,
    ProfessorModule,
    DungeonModule,
    AuthModule,
    ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard
    }
  ],
})
export class AppModule { }
