import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'feedbacks'})
export class Feedback {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    message: string

    @CreateDateColumn({ type: 'datetime', name: 'created_at' })
    createdAt: Date

    // dungeon
    // owner
}