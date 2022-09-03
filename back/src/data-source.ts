import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Session } from './entity/Session';
import { User } from './entity/User';
import { addUserSessionFields1662228724470 } from './migration/1662228724470-add-user-session-fields';
import { createUser9999999999001 } from './seeds/9999999999001-create-user.seed';
const { MYSQL_HOST, MYSQL_USERNAME, MYSQL_DB, MYSQL_PASS } = process.env;
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: MYSQL_HOST,
    port: 3306,
    username: MYSQL_USERNAME,
    password: MYSQL_PASS,
    database: MYSQL_DB,
    synchronize: true,
    logging: false,
    entities: [User, Session],
    migrations: [
        //migrations
        addUserSessionFields1662228724470,
        //seeders
        createUser9999999999001
    ],
    migrationsRun: true
});
