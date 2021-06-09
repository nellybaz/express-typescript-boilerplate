import AuthHelper from "../helpers/authHelpers";
import { UserRepositry } from "../repository/user.repository";
import { NotFound, Unauthorized } from "http-errors";


interface Login {
    email: string,
    password: string
}

export class UserServivce {
    _repo: UserRepositry;
    constructor(repository: UserRepositry) {
        this._repo = repository;
    }

    // method to login here
    async userLogin(payload: Login) {
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


            return this._repo.findOne({ email });
        } catch (error) {
            return error;
        }
    }
}