import { MigrationInterface, QueryRunner } from "typeorm";

export class addFipePriceOnAdvertTable1682432628515 implements MigrationInterface {
    name = 'addFipePriceOnAdvertTable1682432628515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "fipe_price" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "fipe_price"`);
    }

}
