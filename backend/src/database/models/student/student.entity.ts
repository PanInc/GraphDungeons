import { PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base/entities/base.entity";

export class Student extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // dungeons
    // professor
}