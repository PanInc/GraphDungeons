import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { Student } from '@models/student';
import { StudentService } from './student.service';
import { Professor } from '@models/professor';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Professor])],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
