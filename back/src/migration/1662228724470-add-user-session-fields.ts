import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserSessionFields1662228724470 implements MigrationInterface {
    name = 'addUserSessionFields1662228724470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`session\` (\`expiredAt\` bigint NOT NULL, \`id\` varchar(255) NOT NULL, \`json\` text NOT NULL, \`destroyedAt\` datetime(6) NULL, INDEX \`IDX_28c5d1d16da7908c97c9bc2f74\` (\`expiredAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_28c5d1d16da7908c97c9bc2f74\` ON \`session\``);
        await queryRunner.query(`DROP TABLE \`session\``);
    }

}
