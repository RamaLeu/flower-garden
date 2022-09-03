import { MigrationInterface, QueryRunner } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export class createUser9999999999001 implements MigrationInterface {
    name: 'createUser9999999999001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const adminUser = await AppDataSource.getRepository(User).create({
            username: 'admin',
            password: '$2b$15$cqNFu5iAqSpaEVcGi8sWnupfEcIDrl9HaP2SeL9MnAGq.cxu6I46i',
            role: 'admin'
        });
        AppDataSource.getRepository(User).save(adminUser);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log('done');
    }
}
