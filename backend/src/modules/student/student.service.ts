import { Professor } from '@models/professor';
import { CreateStudentDto, Student, UpdateStudentDto } from '@models/student';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>
  ) { }
  async create(createStudentDto: CreateStudentDto) {
    const professor = await this.professorRepository.findOne({ where: { code: createStudentDto.professor_code } })
    delete createStudentDto.professor_code
    
    return await this.studentRepository.insert({
      ...createStudentDto,
      professor
    })
  }

  async findOne(id: string) {
    return await this.studentRepository.findOne({ where: { id }, relations: ["professor"] })
  }

  async findOneByEmail(email: string) {
    return await this.studentRepository.findOne({ where: { email }, relations: ["professor"] })
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }
}
