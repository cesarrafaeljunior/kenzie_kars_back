import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("fuels")
export class Fuel {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 20})
    fuel: string
}