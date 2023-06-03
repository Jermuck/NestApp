import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1685361349341 implements MigrationInterface {
    name = 'Auto1685361349341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Friends" DROP COLUMN "hj"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Friends" ADD "hj" character varying NOT NULL`);
    }

}
