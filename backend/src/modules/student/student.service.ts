import { Professor } from '@models/professor';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { Repository } from 'typeorm';
import { Dungeon } from '@models/dungeon';
import { CreateStudentDto, Student, UpdateStudentDto } from '@models/student';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    @InjectRepository(Dungeon)
    private readonly dungeonRepository: Repository<Dungeon>
  ) { }

  async create(createStudentDto: CreateStudentDto) {
    const professor = await this.professorRepository.findOne({ where: { code: createStudentDto.professor_code } })
    delete createStudentDto.professor_code
    createStudentDto.password = await hash(createStudentDto.password)
     await this.studentRepository.insert({
      ...createStudentDto,
      professor
    })
    return;
  }

  async findOne(id: string) {
    return await this.studentRepository.findOne({ where: { id }, relations: ["professor"] })
  }

  async findOneByEmail(email: string) {
    return await this.studentRepository.findOne({ where: { email }, relations: ["professor"] })
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);
    this.studentRepository.merge(student, updateStudentDto);
    return await this.studentRepository.save(student);
  }

  async createDungeon(code: string, content: string) {
    const student = await this.findOne(code)
    const dungeon = this.dungeonRepository.create({content, owner: student})
    student.dungeons = [...student.dungeons, dungeon]

    await this.dungeonRepository.save(dungeon)
    await this.studentRepository.save(student)
    return;
  }
}
