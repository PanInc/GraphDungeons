import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base/entities/base.entity";
import { Professor } from "../professor/professor.entity";
import { Dungeon } from '../dungeon/dungeon.entity';

@Entity({name: 'students'})
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Professor, (prof) => prof.students)
    professor: Professor

    @OneToMany(() => Dungeon, (dungeon) => dungeon.owner)
    @JoinColumn({ name: 'dungeons_id', referencedColumnName: 'id' })
    dungeons: Dungeon[]
    
}