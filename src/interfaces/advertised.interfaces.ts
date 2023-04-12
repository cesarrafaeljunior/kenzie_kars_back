import { iBrand } from "./brand.interfaces"
import { iColor } from "./color.interface"
import { iComment } from "./comment.interface"
import { iFuel } from "./fuel.interface"
import { iModel } from "./model.interface"
import { iSellerGalery } from "./sellerGalery.interface"
import { iUser } from "./user.interfaces"
import { iYear } from "./year.interface"

export interface iAdvertised {
	id: string
	mileage: number
	price: number
	description: string
	cover_image: string
	location: string
	created_at: Date
	updated_at: Date
	is_avaliable: boolean
}

export interface iAdvertisedRequest {
	mileage: number
	price: number
	description: string
	cover_image: string
	location: string
	is_avaliable: boolean
}

export type iAdvertisedUpdate = Partial<iAdvertisedRequest>
