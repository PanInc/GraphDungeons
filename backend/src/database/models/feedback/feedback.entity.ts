import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dungeon } from "../dungeon/dungeon.entity";

@Entity({name: 'feedbacks'})
export class Feedback {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    message: string

    @CreateDateColumn({ type: 'datetime', name: 'created_at' })
    createdAt: Date

    @OneToOne(() => Dungeon, (dungeon) => dungeon.feedback)
    dungeon: Dungeon
}