import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTitleAd1682655038144 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertised_cars" DROP COLUMN "title"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertised_cars" DROP COLUMN "title"`
    );
  }
}

