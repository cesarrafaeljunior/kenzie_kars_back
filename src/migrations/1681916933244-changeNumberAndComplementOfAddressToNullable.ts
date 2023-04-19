import { MigrationInterface, QueryRunner } from "typeorm";

export class changeNumberAndComplementOfAddressToNullable1681916933244 implements MigrationInterface {
    name = 'changeNumberAndComplementOfAddressToNullable1681916933244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_b4f5c94493f23641866f161e212"`);
        await queryRunner.query(`ALTER TABLE "adresses" ALTER COLUMN "number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" ALTER COLUMN "complement" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "UQ_b4f5c94493f23641866f161e212" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_b4f5c94493f23641866f161e212" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_b4f5c94493f23641866f161e212"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "UQ_b4f5c94493f23641866f161e212"`);
        await queryRunner.query(`ALTER TABLE "adresses" ALTER COLUMN "complement" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" ALTER COLUMN "number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_b4f5c94493f23641866f161e212" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
