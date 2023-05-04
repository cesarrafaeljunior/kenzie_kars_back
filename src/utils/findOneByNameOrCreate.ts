import { EntityTarget, ObjectLiteral } from "typeorm";
import { AppDataSource } from "../data-source";

export const findOneByNameOrCreate = async (
  Entity: EntityTarget<ObjectLiteral>,
  data: { [key: string]: string | number }
) => {
  const repository = AppDataSource.getRepository(Entity);

  const item = await repository.findOneByOrFail(data).catch(async () => {
    const newItem = repository.create(data);
    await repository.save(newItem);
    return newItem;
  });

  delete item.adverts;
  return item;
};
