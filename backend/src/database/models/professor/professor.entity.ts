import { BeforeInsert, Entity, Generated, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../base/entities/base.entity";
import { Dungeon } from "../dungeon/dungeon.entity";
import { Student } from "../student/student.entity";

@Entity({ name: 'professors' })
export class Professor extends BaseEntity {
    @PrimaryColumn()
    code: string;

    @OneToMany(() => Student, (student) => student.professor)
    @JoinColumn({ name: "students_id", referencedColumnName: "id" })
    students: Student[]

    @OneToMany(() => Dungeon, (dungeon) => dungeon.owner)
    @JoinColumn({ name: 'dungeons_id', referencedColumnName: 'id' })
    dungeons: Dungeon[]

}

function generateToken() {
    let token: Array<string | number> | number = Math.floor(Math.random() * (9999999 - 1) + 1)
    if (token < 1000000) {
        token = token.toString().split("")
        while (token.length < 6) {
            token.unshift(0)
        }
        return token.join("")
    } else return token.toString()
}

export function generateProfessorCode() {
    return `PC-${generateToken()}`
}