import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
class AuthHelper {

    async hashPassword(password: string) {
        // checks if there is password provided
        if (!password) {
            throw new Error("Password is required");
        }

        // salt round which bcrypt will use
        const salt = bcrypt.genSaltSync(10);

        // return the generated hashed string
        return bcrypt.hashSync(password, salt);
    }


    async isPasswordValid(passwordHash: string, password: string): Promise<boolean> {
        return bcrypt.compareSync(password, passwordHash);
    }

    async generateToken(payload: { [key: string]: any }): Promise<string> {
        const secret = config.server.jwtSecret;
        // @ts-ignore
        return jwt.sign(payload, secret, { expiresIn: '30d' });

    }
}

export default new AuthHelper();