import { Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../base/entities/base.entity";
import { Student } from "../student/student.entity";

@Entity({name: 'professors'})
export class Professor extends BaseEntity {
    @PrimaryColumn({insert: false, default: () => `PC-${Math.floor(Math.random() * (9999999 - 0) + 0)}`})
    code: string;

    @OneToMany(() => Student, (student) => student.professorCode)
    @JoinColumn({name: "students_id", referencedColumnName: "id"})
    studentsId: Student[]

    // dungeons
    // feedbacks
    // students
}