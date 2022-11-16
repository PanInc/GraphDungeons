import { CreateDungeonDto } from '@models/dungeon';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DungeonService } from './dungeon.service';

@Controller('dungeon')
export class DungeonController {
  constructor(private readonly dungeonService: DungeonService) {}

  @Post()
  create(@Body() createDungeonDto: CreateDungeonDto) {
    return this.dungeonService.create(createDungeonDto);
  }

  @Get()
  findAll() {
    return this.dungeonService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.dungeonService.findOne(code);
  }
}
