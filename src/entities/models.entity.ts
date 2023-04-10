import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Advertised_car } from "./adverts.entity";

@Entity("models")
export class Model {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToMany(() => Advertised_car, (advert) => advert.model)
    advert: Advertised_car

    @Column({length: 50})
    model: string
}