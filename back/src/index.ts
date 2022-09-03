import express from 'express';
import session from 'express-session';
import * as bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import { RegisterRoutes } from '../build/routes';
import { TypeormStore } from 'connect-typeorm/out';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { Session } from './entity/Session';
import { SessionService } from './service/session-service';
import { User as UserEntity } from './entity/User';
import { UserService } from './service/user-service';

declare global {
    namespace Express {
        interface User extends UserEntity {
            id: number;
        }
    }
}

AppDataSource.initialize()
    .then(async () => {
        console.log(`Data source initialized`);
    })
    .catch((error) => console.log(error));

const env = process.env;
const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.use(
    session({
        secret: 'secret_message',
        store: new TypeormStore({
            saveUninitialized: false,
            cleanupLimit: 2,
            limitSubquery: false,
            ttl: 86400
        }).connect(AppDataSource.getRepository(Session)),
        resave: true,
        rolling: true,
        cookie: {
            maxAge: 4320000,
            secure: false
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Strategy({ username: 'username' }, SessionService.loginUser));
passport.serializeUser<number>((user: UserEntity, done) => done(null, user.id));
passport.deserializeUser((id: number, done) => UserService.findOneUser(id).then((user) => done(null, user)));

app.listen(env.PORT, () => {
    console.log(`App listening on port ${env.PORT}`);
});
RegisterRoutes(app);
