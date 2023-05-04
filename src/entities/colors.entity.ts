import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Advertised_car } from "./adverts.entity";

@Entity("colors")
export class Color {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Advertised_car, (advert) => advert.color)
  adverts: Advertised_car[];

  @Column({ type: "varchar", length: 20 })
  color: string;
}
