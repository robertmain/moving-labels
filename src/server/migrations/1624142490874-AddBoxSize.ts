import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBoxSize1624142490874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TYPE "box_size_enum" AS ENUM(\'XLARGE\', \'LARGE\', \'MEDIUM\', \'SMALL\')');
    await queryRunner.query('ALTER TABLE "box" ADD "size" "box_size_enum" DEFAULT \'MEDIUM\'');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "box" DROP COLUMN "size"');
    await queryRunner.query('DROP TYPE "box_size_enum"');
  }
}
