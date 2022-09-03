import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { IVerifyOptions } from 'passport-local';
import { compareSync } from 'bcrypt';
import { logger } from '../utils/logger';

class SessionService {
    public static async loginUser(username: string, password: string, done: (error: any, user?: User | boolean, options?: IVerifyOptions) => void) {
        const foundUser: User | null = await AppDataSource.getRepository(User).findOne({
            where: {
                username: username
            }
        });

        if (!foundUser) {
            logger.log('User logged with incorrect password or email', 'error');
            return done(null, false, { message: 'No user found' });
        }
        if (!compareSync(password, foundUser.password)) {
            logger.log('User logged with incorrect password or email', 'error');
            return done(null, false, { message: 'Password incorrect' });
        }
        logger.log('User logged in', 'info');
        return done(null, foundUser);
    }
}

export { SessionService };
