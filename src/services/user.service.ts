import AuthHelper from "../helpers/authHelpers";
import { UserRepositry } from "../repository/user.repository";
import { Unauthorized } from "http-errors";
import { IResponse } from "../interfaces/response.interface";

interface Login {
    email: string,
    password: string
}

export class UserServivce {
    _repo: UserRepositry;
    constructor(repository: UserRepositry) {
        this._repo = repository;
    }

    async userLogin(payload: Login): Promise<IResponse> {
        try {
            const { email, password } = payload;
            // check if user exist
            const user = await this._repo.findOne({ email });
            if (!user) {
                throw new Unauthorized("User not found");
            }
            // check if password is valid
            const passwordValid = await AuthHelper.isPasswordValid(user.passwordHash, password);
            if (!passwordValid) {
                throw new Unauthorized("Incorrect password")
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
                message: "Authentication successfull",
                error: null
            };
        } catch (error) {
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