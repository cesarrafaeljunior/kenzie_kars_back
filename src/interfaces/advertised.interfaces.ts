import { iBrand } from "./brand.interfaces"
import { iColor } from "./color.interface"
import { iComment } from "./comment.interface"
import { iFuel } from "./fuel.interface"
import { iModel } from "./model.interface"
import { iSellerGalery } from "./sellerGalery.interface"
import { iUser } from "./user.interfaces"
import { iYear } from "./year.interface"

export interface iAdvertised {
	mileage: number
	price: number
	description: string
	cover_image: string
	location: string
	is_avaliable: boolean
	created_at: Date
	updated_at: Date
	user: iUser
	year: iYear
	model: iModel
	fuel: iFuel
	color: iColor
	brand: iBrand
	galery: iSellerGalery[]
	comments: iComment[]
}

export interface iAdvertisedRequest {
	mileage: number
	price: number
	description: string
	cover_image: string
	location: string
	is_avaliable: boolean
	created_at: Date
	updated_at: Date
	user: iUser
}

export type iAdvertisedUpdate = Partial<iAdvertisedRequest>
