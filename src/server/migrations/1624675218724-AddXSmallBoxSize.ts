import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddXSmallBoxSize1624675218724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TYPE "box_size_enum" RENAME TO "box_size_enum_old"');
    await queryRunner.query('CREATE TYPE "box_size_enum" AS ENUM(\'XLARGE\', \'LARGE\', \'MEDIUM\', \'SMALL\', \'XSMALL\')');
    await queryRunner.query('ALTER TABLE "box" ALTER COLUMN "size" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "box" ALTER COLUMN "size" TYPE "box_size_enum" USING "size"::"text"::"box_size_enum"');
    await queryRunner.query('ALTER TABLE "box" ALTER COLUMN "size" SET DEFAULT \'MEDIUM\'');
    await queryRunner.query('DROP TYPE "box_size_enum_old"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TYPE "box_size_enum_old" AS ENUM(\'XLARGE\', \'LARGE\', \'MEDIUM\', \'SMALL\')');
    await queryRunner.query('ALTER TABLE "box" ALTER COLUMN "size" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "box" ALTER COLUMN "size" TYPE "box_size_enum_old" USING "size"::"text"::"box_size_enum_old"');
    await queryRunner.query('ALTER TABLE "box" ALTER COLUMN "size" SET DEFAULT \'MEDIUM\'');
    await queryRunner.query('DROP TYPE "box_size_enum"');
    await queryRunner.query('ALTER TYPE "box_size_enum_old" RENAME TO "box_size_enum"');
  }
}
