import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1683550814726 implements MigrationInterface {
    name = 'Auto1683550814726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`CreateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`description\` varchar(255) NULL, \`tokenId\` varchar(36) NULL, UNIQUE INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` (\`email\`), UNIQUE INDEX \`REL_3c6cabe50889f97af2606cd4fc\` (\`tokenId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Tokens\` (\`id\` varchar(36) NOT NULL, \`token\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Users\` ADD CONSTRAINT \`FK_3c6cabe50889f97af2606cd4fc5\` FOREIGN KEY (\`tokenId\`) REFERENCES \`Tokens\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Users\` DROP FOREIGN KEY \`FK_3c6cabe50889f97af2606cd4fc5\``);
        await queryRunner.query(`DROP TABLE \`Tokens\``);
        await queryRunner.query(`DROP INDEX \`REL_3c6cabe50889f97af2606cd4fc\` ON \`Users\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` ON \`Users\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
    }

}
