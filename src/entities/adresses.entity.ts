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

  @Column({ type: "varchar", length: 8 })
  cep: string;

  @Column({ type: "varchar", length: 2 })
  state: string;

  @Column({ type: "varchar", length: 50 })
  city: string;

  @Column({ type: "varchar", length: 80 })
  street: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  number?: string;

  @Column({ type: "varchar", nullable: true })
  complement?: string;

  @OneToOne(() => User, (user) => user.address, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}
