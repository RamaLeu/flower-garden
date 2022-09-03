import bodyParser = require('body-parser');
import { Request } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { CreateUserForm } from '../models/Request/create-user-form';
import { UserResponse } from '../models/Response/user';
import { UserMapper } from './mapper/user-mapper';
import { hashSync } from 'bcrypt';
import { logger } from '../utils/logger';
const userRepo = AppDataSource.getRepository(User);
export class UserService {
    public static async findUserByName(name: string): Promise<User> {
        const user = await userRepo.findOneBy({ username: name });
        logger.log('User searched by name', 'info');
        return user;
    }
    public static async getUser(id: number): Promise<UserResponse> {
        const user = await userRepo.findOneBy({ id: id });
        logger.log('User searched by id', 'info');
        return user;
    }

    public static async createNewUser(createUserForm: CreateUserForm): Promise<UserResponse | undefined> {
        const existingUser = this.findUserByName(createUserForm.username);
        if (!existingUser) {
            createUserForm.password = hashSync(createUserForm.password, parseInt(process.env.SALT_ROUNDS));
            const newUser = userRepo.create({ ...createUserForm });
            logger.log('New user created', 'info');
            return userRepo.save(newUser).then(UserMapper.toApiUser);
        } else {
            logger.log('User already exists', 'error');
            return undefined;
        }
    }
    public static findOneUser(id: number): Promise<User> {
        return userRepo.findOneBy({ id: id });
    }
}
