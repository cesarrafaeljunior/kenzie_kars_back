import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Advertised_car } from "./adverts.entity";

@Entity("colors")
export class Color {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToMany(() => Advertised_car, (advert) => advert.color)
    advert: Advertised_car

    @Column({length: 20})
    color: string
}