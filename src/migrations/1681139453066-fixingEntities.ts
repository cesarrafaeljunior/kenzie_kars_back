import { MigrationInterface, QueryRunner } from "typeorm";

export class fixingEntities1681139453066 implements MigrationInterface {
    name = 'fixingEntities1681139453066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "years" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" integer NOT NULL, CONSTRAINT "PK_d6fe7de297533f142df4cb749ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "models" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "model" character varying(50) NOT NULL, CONSTRAINT "PK_ef9ed7160ea69013636466bf2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fuels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fuel" character varying(20) NOT NULL, CONSTRAINT "PK_4e8a7eac61d58da2fbb4b8743e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "colors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "color" character varying(20) NOT NULL, CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(50) NOT NULL, CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "fuel"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "yearId" uuid`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "modelId" uuid`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "fuelId" uuid`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "colorId" uuid`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "brandId" uuid`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_a6385b0a3986c5d0ff6ca422e63" FOREIGN KEY ("yearId") REFERENCES "years"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_2d881f577902570132f0d2840dc" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_2d87d242e050cbbd8c20e894246" FOREIGN KEY ("fuelId") REFERENCES "fuels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_b71e8be50bf531475667f9bc8ef" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_3bbaa152f2f8f57186114985d21" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_3bbaa152f2f8f57186114985d21"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_b71e8be50bf531475667f9bc8ef"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_2d87d242e050cbbd8c20e894246"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_2d881f577902570132f0d2840dc"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_a6385b0a3986c5d0ff6ca422e63"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "brandId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "colorId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "fuelId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "modelId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "yearId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "color" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "fuel" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "year" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "model" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "brand" character varying(50) NOT NULL`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TABLE "colors"`);
        await queryRunner.query(`DROP TABLE "fuels"`);
        await queryRunner.query(`DROP TABLE "models"`);
        await queryRunner.query(`DROP TABLE "years"`);
    }

}
