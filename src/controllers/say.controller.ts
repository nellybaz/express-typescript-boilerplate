import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import {httpGet, controller, httpPost, TYPE} from 'inversify-express-utils'
import TYPES from '../../config/types';


@provide(TYPES.InputModifier)
export class InputModifierService{
  modify(){
    return {email:'@email.com'}
  }
}

@controller('/say')
export class SayController {

    constructor(@inject(TYPES.InputModifier) private inputModifier: InputModifierService){}
    @httpGet('/')
    sayHi(req: any, res: any) {
        return res.send('hi');
    }

    @httpPost('/back')
    sayBack(req: any, res: any) {
        const response = this.inputModifier.modify()
        return res.json(response);
    }
}