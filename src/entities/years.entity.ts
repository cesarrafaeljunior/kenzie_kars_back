import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Advertised_car } from "./adverts.entity";

@Entity("years")
export class Year {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Advertised_car, (advert) => advert.year)
  adverts: Advertised_car[];

  @Column()
  year: Number;
}
