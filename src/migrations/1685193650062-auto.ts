import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1685193650062 implements MigrationInterface {
    name = 'Auto1685193650062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Tokens" ("id" SERIAL NOT NULL, "token" text NOT NULL, CONSTRAINT "PK_47b543436b0189860e4e01c7e14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "CreateTime" TIMESTAMP NOT NULL DEFAULT now(), "UpdateTime" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying, "tokenId" integer, "friendsId" integer, CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "REL_3c6cabe50889f97af2606cd4fc" UNIQUE ("tokenId"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Friends" ("id" SERIAL NOT NULL, "hj" character varying NOT NULL, CONSTRAINT "PK_767b684bd5061a45b1fc688e36f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_3c6cabe50889f97af2606cd4fc5" FOREIGN KEY ("tokenId") REFERENCES "Tokens"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_cf80fec9008b7478941e0482753" FOREIGN KEY ("friendsId") REFERENCES "Friends"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_cf80fec9008b7478941e0482753"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_3c6cabe50889f97af2606cd4fc5"`);
        await queryRunner.query(`DROP TABLE "Friends"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Tokens"`);
    }

}
