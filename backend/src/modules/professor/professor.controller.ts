import { GetCurrentUserId } from '@decorators';
import { UpdateProfessorDto } from '@models/professor';
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProfessorService } from './professor.service';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) { }

  @Get()
  findAll() {
    return this.professorService.findAll();
  }

  @Get(':id')
  findOne(@GetCurrentUserId() code: string) {
    return this.professorService.findOne(code);
  }

  @Patch(':id')
  update(@GetCurrentUserId() code: string, @Body() updateProfessorDto: UpdateProfessorDto) {
    return this.professorService.update(code, updateProfessorDto);
  }

  @Get('/dungeons')
  async getDungeons(@GetCurrentUserId() code: string) {
    return (await this.professorService.findOne(code)).dungeons
  }

  @Post('/dungeons/create')
  createDungeon(@GetCurrentUserId() code: string, @Body() content: string) {
    return this.professorService.createDungeon(code, content)
  }

  @Get('/dungeons/students')
  async getStudentsDungeons(@GetCurrentUserId() code: string) {
    return this.professorService.getStudentsDungeons(code)
  }
}
