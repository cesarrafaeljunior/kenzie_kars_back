import { MigrationInterface, QueryRunner } from "typeorm";

export class fixRelations1681166334694 implements MigrationInterface {
    name = 'fixRelations1681166334694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "years" ("id" SERIAL NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_d6fe7de297533f142df4cb749ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "models" ("id" SERIAL NOT NULL, "model" character varying(50) NOT NULL, CONSTRAINT "PK_ef9ed7160ea69013636466bf2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fuels" ("id" SERIAL NOT NULL, "fuel" character varying(20) NOT NULL, CONSTRAINT "PK_4e8a7eac61d58da2fbb4b8743e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "colors" ("id" SERIAL NOT NULL, "color" character varying(20) NOT NULL, CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("id" SERIAL NOT NULL, "brand" character varying(50) NOT NULL, CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "advertId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "seller_galery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying(300) NOT NULL, "advertId" uuid, CONSTRAINT "PK_836f99217eb1da283d7b6d778e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "advertised_cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mileage" integer NOT NULL, "price" numeric(10,2) NOT NULL, "description" character varying NOT NULL, "cover_image" character varying(300) NOT NULL, "location" character varying(8) NOT NULL, "is_avaliable" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "yearId" integer, "modelId" integer, "fuelId" integer, "colorId" integer, "brandId" integer, CONSTRAINT "PK_d5379dbede9a852d8b273107b73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "cpf" character varying(11) NOT NULL, "phone_number" character varying(11) NOT NULL, "birth_date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "password" character varying(120) NOT NULL, "is_seller" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(8) NOT NULL, "state" character varying(2) NOT NULL, "city" character varying(50) NOT NULL, "street" character varying(80) NOT NULL, "number" character varying(10) NOT NULL, "complement" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_c870c44a72a624e88130b663fc2" FOREIGN KEY ("advertId") REFERENCES "advertised_cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "seller_galery" ADD CONSTRAINT "FK_405e2ac40597a8d9c072f8cac93" FOREIGN KEY ("advertId") REFERENCES "advertised_cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_80d38671c2eeff1d184614d6f83" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_a6385b0a3986c5d0ff6ca422e63" FOREIGN KEY ("yearId") REFERENCES "years"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_2d881f577902570132f0d2840dc" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_2d87d242e050cbbd8c20e894246" FOREIGN KEY ("fuelId") REFERENCES "fuels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_b71e8be50bf531475667f9bc8ef" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_3bbaa152f2f8f57186114985d21" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_b4f5c94493f23641866f161e212" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_b4f5c94493f23641866f161e212"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_3bbaa152f2f8f57186114985d21"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_b71e8be50bf531475667f9bc8ef"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_2d87d242e050cbbd8c20e894246"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_2d881f577902570132f0d2840dc"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_a6385b0a3986c5d0ff6ca422e63"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_80d38671c2eeff1d184614d6f83"`);
        await queryRunner.query(`ALTER TABLE "seller_galery" DROP CONSTRAINT "FK_405e2ac40597a8d9c072f8cac93"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_c870c44a72a624e88130b663fc2"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP TABLE "adresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "advertised_cars"`);
        await queryRunner.query(`DROP TABLE "seller_galery"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TABLE "colors"`);
        await queryRunner.query(`DROP TABLE "fuels"`);
        await queryRunner.query(`DROP TABLE "models"`);
        await queryRunner.query(`DROP TABLE "years"`);
    }

}
