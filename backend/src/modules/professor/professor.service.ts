import { CreateProfessorDto, Professor, UpdateProfessorDto } from '@models/professor';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>
  ) { }
  async create(createProfessorDto: CreateProfessorDto) {
    return await this.professorRepository.insert(createProfessorDto)
  }

  async findOne(code: string) {
    return await this.professorRepository.findOne({ where: { code } })
  }

  async update(code: string, updateProfessorDto: UpdateProfessorDto) {
    return `This action updates a #${code} Professor`;
  }
}
