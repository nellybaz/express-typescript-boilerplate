
import jwt from 'jsonwebtoken';
import config from '../../config';

export class JWTService {
    static async generateToken(payload: { [key: string]: any }): Promise<string> {
        const secret = config.server.jwtSecret;
        return jwt.sign(payload, secret, { expiresIn: '30d' });
    }
}