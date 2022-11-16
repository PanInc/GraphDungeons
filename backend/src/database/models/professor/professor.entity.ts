import { Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../base/entities/base.entity";
import { Dungeon } from "../dungeon/dungeon.entity";
import { Student } from "../student/student.entity";

const generateProfessorCode = () => `PC-${Math.floor(Math.random() * (9999999 - 0) + 0)}`

@Entity({ name: 'professors' })
export class Professor extends BaseEntity {
    @PrimaryColumn({ insert: false, default: generateProfessorCode() })
    code: string

    @OneToMany(() => Student, (student) => student.professor)
    @JoinColumn({ name: "students_id", referencedColumnName: "id" })
    students: Student[]

    @OneToMany(() => Dungeon, (dungeon) => dungeon.owner)
    @JoinColumn({ name: 'dungeons_id', referencedColumnName: 'id' })
    dungeons: Dungeon[]

}
