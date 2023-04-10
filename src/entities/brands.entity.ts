import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Advertised_car } from "./adverts.entity";

@Entity("brands")
export class Brand {
    @PrimaryGeneratedColumn()
    id: string

    @OneToMany(() => Advertised_car, (advert) => advert.brand)
    advert: Advertised_car

    @Column({length: 50})
    brand: string
}