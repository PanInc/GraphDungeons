import { CreateProfessorDto, Professor, UpdateProfessorDto } from '@models/professor';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
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

  async findAll() {
    return await this.professorRepository.find({ relations: ["students"] })
  }

  async findOne(code: string) {
    return await this.professorRepository.findOne({ where: { code }, relations: ["students"] })
  }

  async findOneByEmail(email: string) {
    return await this.professorRepository.findOne({ where: { email }, relations: ["students"] })
  }

  async update(code: string, updateProfessorDto: UpdateProfessorDto) {
    const professor = await this.findOne(code);
    this.professorRepository.merge(professor, updateProfessorDto);
    return await this.professorRepository.save(professor);
  }
}
