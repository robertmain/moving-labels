import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllowStorageOfValueDecimals1625364647192
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "item" ALTER COLUMN value TYPE real');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "item" ALTER COLUMN value TYPE integer');
  }
}
