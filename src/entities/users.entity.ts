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
import { Comment } from "./comments.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 11, unique: true })
  cpf: string;

  @Column({ type: "varchar", length: 11, unique: true })
  phone_number: string;

  @Column({ type: "date" })
  birthdate: Date;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @BeforeUpdate()
  @BeforeInsert()
  protected hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @Column({ nullable: true, type: "varchar" })
  reset_token: string;

  @Column({ type: "boolean", default: false })
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
};
