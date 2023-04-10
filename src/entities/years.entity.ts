import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("years")
export class Year {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 50})
    year: Number
}