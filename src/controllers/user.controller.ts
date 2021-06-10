import { Request, Response, Router } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import TYPES from '../../config/types';
import { authValidationMiddleWare } from '../middlewares/validator';
import { UserServivce } from '../services';


@controller('/api')
export class UserController {
    constructor(@inject(TYPES.UserServivce) private userService: UserServivce) {}

    @httpPost('/login', authValidationMiddleWare)
    async login(req: Request, res: Response) {
        const result = await this.userService.userLogin(req.body);
        const { status, error, message, data, statusCode } = result;
        res.status(statusCode).json({ status, message, data, error });
    }

    @httpPost('/register', authValidationMiddleWare)
    async register(req: Request, res: Response) {
        const result = await this.userService.userRegister(req.body);
        const { status, error, message, data, statusCode } = result;
        res.status(statusCode).json({ status, message, data, error });
    }
}
