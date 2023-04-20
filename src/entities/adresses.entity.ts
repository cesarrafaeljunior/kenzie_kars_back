import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
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

  @Column({ length: 10, nullable: true })
  number?: string;

  @Column({ nullable: true })
  complement?: string;

  @OneToOne(() => User, (user) => user.address, { cascade: true })
  @JoinColumn()
  user: User;
}
