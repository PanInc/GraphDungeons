import { CreateDungeonDto } from '@models/dungeon';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DungeonService {
  create(createDungeonDto: CreateDungeonDto) {
    return 'This action adds a new dungeon';
  }

  findAll() {
    return `This action returns all dungeon`;
  }

  findOne(code: string) {
    return `This action returns a #${code} dungeon`;
  }
}
