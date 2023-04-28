import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./users.entity";
import { Year } from "./years.entity";
import { Model } from "./models.entity";
import { Fuel } from "./fuels.entity";
import { Color } from "./colors.entity";
import { Brand } from "./brands.entity";
import { Comment } from "./comments.entity";
import { SellerGalery } from "./sellerGalery.entity";

@Entity("advertised_cars")
export class Advertised_car {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "integer" })
  mileage: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  fipe_price: number;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "varchar", length: 300 })
  cover_image: string;

  @Column({ type: "varchar", length: 8 })
  location: string;

  @Column({ type: "boolean", default: true })
  is_avaliable: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.adverts, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Year, (year) => year.adverts, { onDelete: "CASCADE" })
  year: Year;

  @ManyToOne(() => Model, (model) => model.adverts, { onDelete: "CASCADE" })
  model: Model;

  @ManyToOne(() => Fuel, (fuel) => fuel.adverts, { onDelete: "CASCADE" })
  fuel: Fuel;

  @ManyToOne(() => Color, (color) => color.adverts, { onDelete: "CASCADE" })
  color: Color;

  @ManyToOne(() => Brand, (brand) => brand.adverts, { onDelete: "CASCADE" })
  brand: Brand;

  @OneToMany(() => SellerGalery, (galery) => galery.advert)
  galery: SellerGalery[];

  @OneToMany(() => Comment, (comment) => comment.advert)
  comments: Comment[];
}
