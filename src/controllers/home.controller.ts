import { controller, httpGet } from 'inversify-express-utils';
import { Application, Request, Response, NextFunction, RequestHandler } from 'express';
import TYPES from '../../config/types';
import { SampleService } from '../services';
import { inject } from 'inversify';

const someMiddleWare = (req: any, res: any, next: any) => {
  console.log('hi middle ware');
  req.nickName = 'Nelson'
  next()
};


@controller('/')
export class HomeController {
  constructor(@inject(TYPES.SampleService) private service: SampleService){}

    @httpGet('/', someMiddleWare)
    async home(req: any, res: Response) {
      console.log(req.nickName);
      
        return this.service.getAllUsers()
    }
}
