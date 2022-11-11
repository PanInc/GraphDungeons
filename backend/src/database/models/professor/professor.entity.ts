import { PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base/entities/base.entity";

export class Professor extends BaseEntity {
    @PrimaryColumn({insert: false, default: () => `PC-${Math.floor(Math.random() * (9999999 - 0) + 0)}`})
    code: string;

    // dungeons
    // feedbacks
    // students
}