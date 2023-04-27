import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedResetRotpkenField1682516072078 implements MigrationInterface {
    name = 'AddedResetRotpkenField1682516072078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_token"`);
    }

}
