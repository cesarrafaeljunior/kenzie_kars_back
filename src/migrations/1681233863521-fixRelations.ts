import { MigrationInterface, QueryRunner } from "typeorm";

export class fixRelations1681233863521 implements MigrationInterface {
    name = 'fixRelations1681233863521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_a6385b0a3986c5d0ff6ca422e63"`);
        await queryRunner.query(`ALTER TABLE "years" DROP CONSTRAINT "PK_d6fe7de297533f142df4cb749ab"`);
        await queryRunner.query(`ALTER TABLE "years" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "years" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "years" ADD CONSTRAINT "PK_d6fe7de297533f142df4cb749ab" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_2d881f577902570132f0d2840dc"`);
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "PK_ef9ed7160ea69013636466bf2d5"`);
        await queryRunner.query(`ALTER TABLE "models" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "models" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "PK_ef9ed7160ea69013636466bf2d5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_2d87d242e050cbbd8c20e894246"`);
        await queryRunner.query(`ALTER TABLE "fuels" DROP CONSTRAINT "PK_4e8a7eac61d58da2fbb4b8743e1"`);
        await queryRunner.query(`ALTER TABLE "fuels" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "fuels" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fuels" ADD CONSTRAINT "PK_4e8a7eac61d58da2fbb4b8743e1" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_b71e8be50bf531475667f9bc8ef"`);
        await queryRunner.query(`ALTER TABLE "colors" DROP CONSTRAINT "PK_3a62edc12d29307872ab1777ced"`);
        await queryRunner.query(`ALTER TABLE "colors" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "colors" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "colors" ADD CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_3bbaa152f2f8f57186114985d21"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "PK_b0c437120b624da1034a81fc561"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "yearId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "yearId" integer`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "modelId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "modelId" integer`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "fuelId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "fuelId" integer`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "colorId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "colorId" integer`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "brandId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "brandId" integer`);
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
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "brandId" uuid`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "colorId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "colorId" uuid`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "fuelId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "fuelId" uuid`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "modelId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "modelId" uuid`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP COLUMN "yearId"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD "yearId" uuid`);
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "PK_b0c437120b624da1034a81fc561"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_3bbaa152f2f8f57186114985d21" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "colors" DROP CONSTRAINT "PK_3a62edc12d29307872ab1777ced"`);
        await queryRunner.query(`ALTER TABLE "colors" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "colors" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "colors" ADD CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_b71e8be50bf531475667f9bc8ef" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fuels" DROP CONSTRAINT "PK_4e8a7eac61d58da2fbb4b8743e1"`);
        await queryRunner.query(`ALTER TABLE "fuels" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "fuels" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "fuels" ADD CONSTRAINT "PK_4e8a7eac61d58da2fbb4b8743e1" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_2d87d242e050cbbd8c20e894246" FOREIGN KEY ("fuelId") REFERENCES "fuels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "PK_ef9ed7160ea69013636466bf2d5"`);
        await queryRunner.query(`ALTER TABLE "models" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "models" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "PK_ef9ed7160ea69013636466bf2d5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_2d881f577902570132f0d2840dc" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "years" DROP CONSTRAINT "PK_d6fe7de297533f142df4cb749ab"`);
        await queryRunner.query(`ALTER TABLE "years" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "years" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "years" ADD CONSTRAINT "PK_d6fe7de297533f142df4cb749ab" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_a6385b0a3986c5d0ff6ca422e63" FOREIGN KEY ("yearId") REFERENCES "years"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
