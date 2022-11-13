import { CreateProfessorDto, Professor, UpdateProfessorDto } from '@models/professor';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>
  ) { }

  async create(createProfessorDto: CreateProfessorDto) {
    if (await this.professorRepository.findOne({
      where: {
        email: createProfessorDto.email
      }
    })) throw new ForbiddenException('Duplicated entity')
    return await this.professorRepository.insert(createProfessorDto)
  }

  async findOne(code: string) {
    return await this.professorRepository.findOne({
      where: {
        code
      },
      relations: ["dungeons", "students"]
    })
  }

  async update(code: string, updateProfessorDto: UpdateProfessorDto) {
    const professor = await this.findOne(code)
    this.professorRepository.merge(professor, updateProfessorDto)
    return await this.professorRepository.save(professor)
  }
}
