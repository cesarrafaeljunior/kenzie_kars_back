import { AppDataSource } from "../data-source"
import { AppError } from "../errors"
import { iAdvertised, iAdvertisedRequest } from "../interfaces/advertised.interfaces"
import { Repository } from "typeorm"
import { User } from "../entities/users.entity"
import { Advertised_car } from "../entities/adverts.entity"
import { advertisedResponseSchema } from "../schemas/advertisedcars.shemas"

export const createAdvertisedService = async (
	userId: string,
	advertisedData: iAdvertisedRequest
): Promise<iAdvertisedRequest> => {
	const userRepository: Repository<User> = AppDataSource.getRepository(User)
	const advertisedRespository: Repository<Advertised_car> =
		AppDataSource.getRepository(Advertised_car)

	const user: User | null = await userRepository.findOneBy({
		id: userId,
	})

	const advertised: Advertised_car = advertisedRespository.create({
		...advertisedData,
		user: user!,
	})
	await advertisedRespository.save(advertised)

	const advertisedValidated: iAdvertised = advertisedResponseSchema.validateSync(advertised, {
		stripUnknown: true,
		abortEarly: false,
	})

	return advertisedValidated
}

export const retrieveAdvertisedService = async (userId: string) => {
	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const advertised = await userRepository.findOne({
		where: {
			id: userId,
		},
		relations: {
			adverts: true,
		},
	})

	return advertised
}
