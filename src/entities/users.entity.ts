import { hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Advertised_car } from "./adverts.entity";
import { Address } from "./adresses.entity";
import { Comment } from "./comments";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ length: 11, unique: true })
  phone_number: string;

  @Column({ type: "date" })
  birthdate: Date;

  @Column()
  description: string;

  @Column({ length: 120 })
  password: string;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @Column({ default: false })
  is_seller: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Advertised_car, (advert) => advert.user)
  adverts: Advertised_car[];

  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
