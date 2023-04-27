import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Advertised_car } from "./adverts.entity";

@Entity("models")
export class Model {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Advertised_car, (advert) => advert.model)
  adverts: Advertised_car[];

  @Column({ type: "varchar", length: 50 })
  model: string;
}
