import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users.entity";

@Entity("advertised_cars")
export class Advertised_car {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 50})
    brand: string

    @Column({length: 50})
    model: string

    @Column()
    year: Number

    @Column({length: 20})
    fuel: string

    @Column()
    mileage: number

    @Column({length: 20})
    color: string

    @Column({type: "decimal", precision: 10, scale: 2})
    price: number

    @Column()
    description: string

    @Column({length: 300})
    cover_image: string

    @Column({length: 8})
    location: string

    @Column({default: true})
    is_avaliable: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => User, {cascade: true})
    user: User
}