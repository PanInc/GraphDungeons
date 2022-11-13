import { CreateStudentDto, UpdateStudentDto, Student } from '@models/student';
import { ProfessorService } from '@modules/professor';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly professorService: ProfessorService
  ) { }
  async create(createStudentDto: CreateStudentDto) {
    if (await this.studentRepository.findOne({
      where: {
        email: createStudentDto.email
      }
    })) throw new ForbiddenException('Duplicated entity')
    if (await this.professorService.findOne(createStudentDto.professorCode)) throw new ForbiddenException('Professor not found')
    return await this.studentRepository.insert(createStudentDto)
  }

  async findOne(id: string) {
    return await this.studentRepository.findOne({
      where: {
        id
      },
      relations: ["dungeons"]
    })
  } // criar find one or fail 

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const user = await this.findOne(id)
    this.studentRepository.merge(user, updateStudentDto)
    return await this.studentRepository.save(user)
  }
}
