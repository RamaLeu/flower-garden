import { NextFunction, Request, response, Response } from 'express';
import { AppDataSource } from '../data-source';
import { UserService } from '../service/user-service';
import { Body, Controller, Get, Path, Route, Post, Middlewares } from 'tsoa';
import { UserResponse } from '../models/Response/user';
import { CreateUserForm } from '../models/Request/create-user-form';
import { AuthMiddleware } from '../middlewares/auth-middleware';
import { logger } from '../utils/logger';

@Route('users')
export class UserController extends Controller {
    @Get('{userId}')
    public async getUser(@Path() userId: number): Promise<UserResponse> {
        return UserService.getUser(userId);
    }
    @Post()
    @Middlewares(AuthMiddleware.loggedIn())
    public async CreateNewUser(@Body() creatUserForm: CreateUserForm): Promise<UserResponse> {
        return UserService.createNewUser(creatUserForm).then((user) => {
            if (user) {
                return user;
            } else {
                this.setStatus(400);
                logger.log('User already exists', 'error');
                throw new Error();
            }
        });
    }
}
