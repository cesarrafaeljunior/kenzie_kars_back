import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("brands")
export class Brand {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 50})
    brand: string
}