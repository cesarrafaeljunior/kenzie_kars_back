import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Advertised_car } from "./adverts.entity";

@Entity("seller_galery")
export class SellerGalery {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 300 })
  image: string;

  @ManyToOne(() => Advertised_car, (advert) => advert.galery, {
    onDelete: "CASCADE",
  })
  advert: Advertised_car;
}
