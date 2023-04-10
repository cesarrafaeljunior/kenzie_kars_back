import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("colors")
export class Color {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 20})
    color: string
}