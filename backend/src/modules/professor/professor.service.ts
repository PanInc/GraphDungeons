import { CreateProfessorDto, Professor, UpdateProfessorDto } from '@models/professor';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { Repository } from 'typeorm';
import { Dungeon } from '../../database/models/dungeon/dungeon.entity';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    @InjectRepository(Dungeon)
    private readonly dungeonRepository: Repository<Dungeon>
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

  async createDungeon(code: string, content: string) {
    const professor = await this.findOne(code)
    const dungeon = this.dungeonRepository.create({content, owner: professor})
    professor.dungeons = [...professor.dungeons, dungeon]

    await this.dungeonRepository.save(dungeon)
    await this.professorRepository.save(professor)
    return;
  }

  async update(code: string, updateProfessorDto: UpdateProfessorDto) {
    const professor = await this.findOne(code);
    this.professorRepository.merge(professor, updateProfessorDto);
    return await this.professorRepository.save(professor);
  }
}
