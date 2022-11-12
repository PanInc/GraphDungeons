import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'dungeons'})
export class Dungeon {
    @PrimaryColumn({ insert: false, default: () => `DID-${Math.floor(Math.random() * (9999999999 - 0) + 0)}` })
    id: string

    @Column()
    content: string

    @CreateDateColumn({ type: 'datetime', name: 'created_at' })
    createdAt: Date

    // owner
    // feedback
}