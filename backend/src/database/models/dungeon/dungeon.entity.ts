import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Feedback } from "../feedback/feedback.entity";
import { Professor } from '../professor/professor.entity';
import { Student } from '../student/student.entity';

@Entity({name: 'dungeons'})
export class Dungeon {
    @PrimaryColumn({ insert: false, default: () => `DID-${Math.floor(Math.random() * (9999999999 - 0) + 0)}` })
    id: string

    @Column()
    content: string

    @CreateDateColumn({ type: 'datetime', name: 'created_at' })
    createdAt: Date

    @ManyToOne(() => Professor || Student, (owner) => owner.dungeons)
    owner: Professor | Student

    @OneToOne(() => Feedback, (feedback) => feedback.dungeon)
    @JoinColumn({ name: 'feedback_id', referencedColumnName: 'id' })
    feedback: Feedback
}