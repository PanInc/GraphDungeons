import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Professor } from '@models/professor/professor.entity';
import { ProfessorController, ProfessorService } from '@modules/professor';

@Module({
  imports: [TypeOrmModule.forFeature([Professor])],
  controllers: [ProfessorController],
  providers: [ProfessorService]
})
export class ProfessorModule {}
