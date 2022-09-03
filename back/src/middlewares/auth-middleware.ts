import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware {
    public static readonly loggedIn = () => {
        return (req: Request, res: Response, next: NextFunction) => {
            const user = req.user;
            if (!user) {
                return res.status(403).send({ message: 'Unauthorized' });
            } else {
                return next();
            }
        };
    };
}
