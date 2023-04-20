import { MigrationInterface, QueryRunner } from "typeorm";

export class fixOnDeleteToCascade1682003198778 implements MigrationInterface {
    name = 'fixOnDeleteToCascade1682003198778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_b4f5c94493f23641866f161e212"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_c870c44a72a624e88130b663fc2"`);
        await queryRunner.query(`ALTER TABLE "seller_galery" DROP CONSTRAINT "FK_405e2ac40597a8d9c072f8cac93"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_2d87d242e050cbbd8c20e894246"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_2d881f577902570132f0d2840dc"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_3bbaa152f2f8f57186114985d21"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_80d38671c2eeff1d184614d6f83"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_a6385b0a3986c5d0ff6ca422e63"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_b71e8be50bf531475667f9bc8ef"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_b4f5c94493f23641866f161e212" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_c870c44a72a624e88130b663fc2" FOREIGN KEY ("advertId") REFERENCES "advertised_cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "seller_galery" ADD CONSTRAINT "FK_405e2ac40597a8d9c072f8cac93" FOREIGN KEY ("advertId") REFERENCES "advertised_cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_80d38671c2eeff1d184614d6f83" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_a6385b0a3986c5d0ff6ca422e63" FOREIGN KEY ("yearId") REFERENCES "years"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_2d881f577902570132f0d2840dc" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_2d87d242e050cbbd8c20e894246" FOREIGN KEY ("fuelId") REFERENCES "fuels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_b71e8be50bf531475667f9bc8ef" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_3bbaa152f2f8f57186114985d21" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_3bbaa152f2f8f57186114985d21"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_b71e8be50bf531475667f9bc8ef"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_2d87d242e050cbbd8c20e894246"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_2d881f577902570132f0d2840dc"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_a6385b0a3986c5d0ff6ca422e63"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" DROP CONSTRAINT "FK_80d38671c2eeff1d184614d6f83"`);
        await queryRunner.query(`ALTER TABLE "seller_galery" DROP CONSTRAINT "FK_405e2ac40597a8d9c072f8cac93"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_c870c44a72a624e88130b663fc2"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_b4f5c94493f23641866f161e212"`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_b71e8be50bf531475667f9bc8ef" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_a6385b0a3986c5d0ff6ca422e63" FOREIGN KEY ("yearId") REFERENCES "years"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_80d38671c2eeff1d184614d6f83" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_3bbaa152f2f8f57186114985d21" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_2d881f577902570132f0d2840dc" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertised_cars" ADD CONSTRAINT "FK_2d87d242e050cbbd8c20e894246" FOREIGN KEY ("fuelId") REFERENCES "fuels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "seller_galery" ADD CONSTRAINT "FK_405e2ac40597a8d9c072f8cac93" FOREIGN KEY ("advertId") REFERENCES "advertised_cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_c870c44a72a624e88130b663fc2" FOREIGN KEY ("advertId") REFERENCES "advertised_cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_b4f5c94493f23641866f161e212" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
