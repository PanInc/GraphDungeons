import { CreateProfessorDto, UpdateProfessorDto } from '@models/professor';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfessorService {
  async create(createProfessorDto: CreateProfessorDto) {
    return 'This action adds a new professor';
  }

  async findOne(code: string) {
    return `This action returns a #${code} professor`;
  }

  async update(id: number, updateProfessorDto: UpdateProfessorDto) {
    return `This action updates a #${id} professor`;
  }
}
