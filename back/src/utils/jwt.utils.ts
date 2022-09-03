import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    config();
    const privateKey = process.env.PRIVATE_KEY;
    const publicKey = process.env.PUBLIC_KEY;
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    });
}

export function verifyJwt(token: string) {
    config();

    const privateKey = process.env.PRIVATE_KEY;
    const publicKey = process.env.PUBLIC_KEY;
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded
        };
    } catch (e: any) {
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        };
    }
}
