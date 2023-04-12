import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm"
import { User } from "./users.entity"
import { Year } from "./years.entity"
import { Model } from "./models.entity"
import { Fuel } from "./fuels.entity"
import { Color } from "./colors.entity"
import { Brand } from "./brands.entity"
import { Comment } from "./comments"
import { SellerGalery } from "./sellerGalery.entity"

@Entity("advertised_cars")
export class Advertised_car {
	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column()
	mileage: number

	@Column({ type: "decimal", precision: 10, scale: 2 })
	price: number

	@Column()
	description: string

	@Column({ length: 300 })
	cover_image: string

	@Column({ length: 8 })
	location: string

	@Column({ default: true })
	is_avaliable: boolean

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date

	@ManyToOne(() => User, (user) => user.adverts, { cascade: true })
	user: User

	@ManyToOne(() => Year, (year) => year.adverts, { cascade: true })
	year: Year

	@ManyToOne(() => Model, (model) => model.adverts, { cascade: true })
	model: Model

	@ManyToOne(() => Fuel, (fuel) => fuel.adverts, { cascade: true })
	fuel: Fuel

	@ManyToOne(() => Color, (color) => color.adverts, { cascade: true })
	color: Color

	@ManyToOne(() => Brand, (brand) => brand.adverts, { cascade: true })
	brand: Brand

	@OneToMany(() => SellerGalery, (galery) => galery.advert)
	galery: SellerGalery[]

	@OneToMany(() => Comment, (comment) => comment.advert)
	comments: Comment[]
}
