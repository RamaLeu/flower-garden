import * as express from 'express';
import { Body, Controller, Delete, Get, Middlewares, Post, Request, Route } from 'tsoa';
import { LoginUserForm } from '../models/Request/login-user-form';
import passport from 'passport';
import { SessionService } from '../service/session-service';
import { Session } from '../models/Response/session';
import { request } from 'http';

@Route('session')
export class SessionController extends Controller {
    @Get()
    public async getSession(@Request() request: Express.Request): Promise<Session> {
        if (!request.user) {
            this.setStatus(500);
            return {};
        }
        return {
            user: {
                username: request.user.username,
                role: request.user.role
            }
        };
    }
    @Post()
    @Middlewares(passport.authenticate('local'))
    public async login(@Body() loginUserForm: LoginUserForm, @Request() request: Express.Request): Promise<Session> {
        if (!request.user) {
            this.setStatus(500);
            return {};
        }
        return {
            user: {
                username: request.user.username,
                role: request.user.role
            }
        };
    }
    @Delete()
    public async logout(@Request() request: Express.Request): Promise<void> {
        return request.logout({ keepSessionInfo: false }, () => {
            this.setStatus(200);
            return 'Logged out';
        });
    }
}
