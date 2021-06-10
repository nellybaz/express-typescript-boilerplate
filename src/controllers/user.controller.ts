import { Request, Response, Router } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import TYPES from '../../config/types';
import { validateInput } from '../helpers/validator';
// import { loginValidationSchema } from '../middlewares/validationSchema';
import { UserServivce } from '../services';


@controller('/api')
export class UserController {
    constructor(@inject(TYPES.UserServivce) private userService: UserServivce) {}

    @httpPost('/login')
    async login(req: Request, res: Response) {
        const result = await this.userService.userLogin(req.body);
        const { status, error, message, data, statusCode } = result;
        res.status(statusCode).json({ status, message, data, error });
    }

    // validateInput(loginValidationSchema
    @httpPost('/register')
    async register(req: Request, res: Response) {
        const result = await this.userService.userRegister(req.body);
        const { status, error, message, data, statusCode } = result;
        res.status(statusCode).json({ status, message, data, error });
    }
}
