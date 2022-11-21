import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { Professor } from '@models/professor';
import { Dungeon } from '@models/dungeon';

@Module({
  imports: [TypeOrmModule.forFeature([Professor, Dungeon])],
  controllers: [ProfessorController],
  providers: [ProfessorService],
  exports: [ProfessorService]
})
export class ProfessorModule {}
