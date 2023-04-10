import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("models")
export class Model {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 50})
    model: string
}