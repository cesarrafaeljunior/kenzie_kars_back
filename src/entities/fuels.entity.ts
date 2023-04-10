import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Advertised_car } from "./adverts.entity";

@Entity("fuels")
export class Fuel {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToMany(() => Advertised_car, (advert) => advert.fuel)
    adverts: Advertised_car[];

    @Column({ length: 20 })
    fuel: string;
}
