import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base/entities/base.entity";
import { Professor } from "../professor/professor.entity";

@Entity({name: 'students'})
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Professor, (prof) => prof.code)
    professorCode: Professor

    // dungeons
    // professor
}