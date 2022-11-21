import { GetCurrentUserId } from '@decorators';
import { UpdateProfessorDto } from '@models/professor';
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProfessorService } from './professor.service';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Get()
  findAll() {
    return this.professorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessorDto: UpdateProfessorDto) {
    return this.professorService.update(id, updateProfessorDto);
  }

  @Post('/dungeon/create')
  createDungeon(@GetCurrentUserId() code: string, @Body() content: string) {
    return this,this.professorService.createDungeon(code, content)
  }
}
