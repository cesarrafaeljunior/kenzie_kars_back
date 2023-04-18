import { MigrationInterface, QueryRunner } from "typeorm";

export class createTitleOfAdvert1681844743468 implements MigrationInterface {
    name = 'createTitleOfAdvert1681844743468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "title" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "title"`);
    }

}
