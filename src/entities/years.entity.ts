import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "./users.entity";
import { Advertised_car } from "./adverts.entity";

@Entity("years")
export class Year {
    @PrimaryGeneratedColumn()
    id: string

    @OneToMany(() => Advertised_car, (advert) => advert.year)
    advert: Advertised_car

    @Column()
    year: Number
}