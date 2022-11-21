import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { Student } from '@models/student';
import { StudentService } from './student.service';
import { Professor } from '@models/professor';
import { Dungeon } from '../../database/models/dungeon/dungeon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Professor, Dungeon])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService]
})
export class StudentModule {}
