import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DungeonService } from './dungeon.service';
import { DungeonController } from './dungeon.controller';
import { Dungeon } from '@models/dungeon';

@Module({
  imports: [TypeOrmModule.forFeature([Dungeon])],
  controllers: [DungeonController],
  providers: [DungeonService]
})
export class DungeonModule {}
