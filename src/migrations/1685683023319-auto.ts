import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1685683023319 implements MigrationInterface {
    name = 'Auto1685683023319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_cf80fec9008b7478941e0482753"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_cf80fec9008b7478941e0482753" UNIQUE ("friendsId")`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_cf80fec9008b7478941e0482753" FOREIGN KEY ("friendsId") REFERENCES "Friends"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_cf80fec9008b7478941e0482753"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "UQ_cf80fec9008b7478941e0482753"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_cf80fec9008b7478941e0482753" FOREIGN KEY ("friendsId") REFERENCES "Friends"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
