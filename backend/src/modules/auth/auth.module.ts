import { Module } from '@nestjs/common';
import { StudentAuthService } from './student/student-auth.service';
import { ProfessorAuthService } from './professor/professor-auth.service';
import { ProfessorAuthController } from './professor/professor-auth.controller';
import { StudentAuthController } from './student/student-auth.controller';
import { ProfessorModule } from '@modules/professor';
import { StudentModule } from '@modules/student';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [StudentModule, ProfessorModule, PassportModule,
    JwtModule.register({})],
  controllers: [ProfessorAuthController, StudentAuthController],
  providers: [StudentAuthService, ProfessorAuthService]
})
export class AuthModule { }
