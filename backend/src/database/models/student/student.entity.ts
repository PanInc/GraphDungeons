import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base/entities/base.entity";

@Entity({name: 'students'})
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // dungeons
    // professor
}