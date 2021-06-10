import AuthHelper from "../helpers/authHelpers";
import { UserRepositry } from "../repository/user.repository";
import { IResponse } from "../interfaces/response.interface";
import { Conflict, InternalServerError, Unauthorized } from "http-errors";
import { inject, injectable } from "inversify";
import TYPES from "../../config/types";

interface Login {
    email: string,
    password: string
}


@injectable()
export class UserServivce {
    constructor(@inject(TYPES.UserRepositry) private _repo: UserRepositry) {}

    async userLogin(payload: Login): Promise<IResponse> {
        try {
            const { email, password } = payload;
            // check if user exist
            const user = await this._repo.findOne({ email });
            if (!user) {
                throw new Unauthorized('User not found');
            }
            // check if password is valid
            const passwordValid = await AuthHelper.isPasswordValid(user.passwordHash, password);
            if (!passwordValid) {
                throw new Unauthorized('Incorrect password');
            }
            // generate token
            const token = await AuthHelper.generateToken({ userId: user._id });

            return {
                status: true,
                statusCode: 200,
                data: {
                    email: user.email,
                    token
                },
                message: 'Authentication successfull',
                error: null
            };
        } catch (error: any) {
            return {
                status: false,
                statusCode: error.status || 400,
                data: null,
                message: error.message,
                error
            };
        }
    }

    // handles user register
    async userRegister(payload: Login) {
        try {
            const { email, password } = payload;

            // check if that email exist
            const existingUser = await this._repo.findOne({ email });
            if (existingUser) {
                throw new Conflict('Email exist');
            }

            // hash password
            const passwordHash = await AuthHelper.hashPassword(password);

            // create the user
            const user = await this._repo.create({ email, passwordHash });
            if (!user) {
                throw new InternalServerError("Unable to save user's data");
            }

            // create token
            const token = await AuthHelper.generateToken({ userId: user._id });

            // return the response
            return {
                status: true,
                statusCode: 201,
                data: {
                    email: user.email,
                    token
                },
                message: 'User registration successfull',
                error: null
            };
        } catch (error: any) {
            return {
                status: false,
                statusCode: error.status || 400,
                data: null,
                message: error.message,
                error
            };
        }
    }
}