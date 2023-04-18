import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./users.entity";

@Entity("adresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 8 })
  cep: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 80 })
  street: string;

  @Column({ length: 10 })
  number: string;

  @Column()
  complement: string;

  @ManyToOne(() => User, (user) => user.adresses, { cascade: true })
  user: User;
}
