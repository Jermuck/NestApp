import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1685368337318 implements MigrationInterface {
    name = 'Auto1685368337318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Friends" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "Friends" ADD CONSTRAINT "UQ_7a0d6e2034785428b102e216452" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "Friends" ADD CONSTRAINT "FK_7a0d6e2034785428b102e216452" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Friends" DROP CONSTRAINT "FK_7a0d6e2034785428b102e216452"`);
        await queryRunner.query(`ALTER TABLE "Friends" DROP CONSTRAINT "UQ_7a0d6e2034785428b102e216452"`);
        await queryRunner.query(`ALTER TABLE "Friends" DROP COLUMN "userId"`);
    }

}
