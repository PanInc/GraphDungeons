import { GetCurrentUserId } from '@decorators';
import { CreateStudentDto, UpdateStudentDto } from '@models/student';
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findOne(@GetCurrentUserId() id: string) {
    return this.studentService.findOne(id);
  }

  @Patch()
  update(@GetCurrentUserId() id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Get('/dungeons')
  async getDungeons(@GetCurrentUserId() code: string) {
    return (await this.studentService.findOne(code)).dungeons
  }

  @Post('/dungeons/create')
  createDungeon(@GetCurrentUserId() code: string, @Body() content: string) {
    return this.studentService.createDungeon(code, content)
  }
}
