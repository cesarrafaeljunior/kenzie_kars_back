import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users.entity";
import { Year } from "./years.entity";
import { Model } from "./models.entity";
import { Fuel } from "./fuels.entity";
import { Color } from "./colors.entity";
import { Brand } from "./brands.entity";

@Entity("advertised_cars")
export class Advertised_car {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    mileage: number
    
    @Column({type: "decimal", precision: 10, scale: 2})
    price: number
    
    @Column()
    description: string
    
    @Column({length: 300})
    cover_image: string
    
    @Column({length: 8})
    location: string
    
    @Column({default: true})
    is_avaliable: boolean
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
    
    @ManyToOne(() => User, {cascade: true})
    user: User
    
    @ManyToOne(() => Year, (year) => year.advert, {cascade: true})
    year: Year
    
    @ManyToOne(() => Model, (model) => model.advert, {cascade: true})
    model: Model
    
    @ManyToOne(() => Fuel, (fuel) => fuel.advert, {cascade:true})
    fuel: Fuel
    
    @ManyToOne(() => Color, (color) => color.advert, {cascade:true})
    color: Color
    
    @ManyToOne(() => Brand, (brand) => brand.advert, {cascade:true})
    brand: Brand
}
