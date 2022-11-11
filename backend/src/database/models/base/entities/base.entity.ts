import { hash } from "argon2";
import { BeforeInsert, BeforeUpdate, Column } from "typeorm";

export class BaseEntity {
    @Column({ unique: true })
    email: string

    @Column()
    name: string

    @Column()
    password: string

    @Column({ nullable: true })
    hashedRefreshToken: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password);
    }

    @BeforeUpdate()
    async updatePassword() {
        this.password = await hash(this.password);
    }
}
