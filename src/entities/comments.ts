import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users.entity";
import { Advertised_car } from "./adverts.entity";

@Entity("comments")
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    description: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => User)
    user: User
    
    @ManyToOne(() => Advertised_car, {cascade: true})
    advert: Advertised_car
}