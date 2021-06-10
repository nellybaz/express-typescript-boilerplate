import { controller, httpGet } from 'inversify-express-utils';
import { Application, Request, Response, NextFunction } from 'express';

@controller('/')
export class HomeController {
    @httpGet('')
    home(req: Request, res: Response) {
        return res.json({ message: 'hi' });
    }
}
