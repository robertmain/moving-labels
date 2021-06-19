import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBoxAndItemEntities1623469585504
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "value" integer, "boxId" uuid NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id")); COMMENT ON COLUMN "item"."value" IS \'The value of a given item in cents(to make currency calculations easier)\'');
    await queryRunner.query('CREATE TABLE "box" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, CONSTRAINT "PK_1a95bae3d12a9f21be6502e8a8b" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "item" ADD CONSTRAINT "FK_a117b3c4f95962ed161930f1d80" FOREIGN KEY ("boxId") REFERENCES "box"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "item" DROP CONSTRAINT "FK_a117b3c4f95962ed161930f1d80"');
    await queryRunner.query('DROP TABLE "box"');
    await queryRunner.query('DROP TABLE "item"');
  }
}
