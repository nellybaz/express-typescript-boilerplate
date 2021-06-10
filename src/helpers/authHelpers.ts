import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
class AuthHelper {

    // handles password hashing
    async hashPassword(password: string) {
        // checks if there is password provided
        if (!password) {
            throw new Error("Error hashing password");
        }

        // salt round which bcrypt will use
        const salt = bcrypt.genSaltSync(10);

        // return the generated hashed string
        return bcrypt.hashSync(password, salt);
    }

    // handles check for a password validity by comparing the
    // hash with the provided plain password
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