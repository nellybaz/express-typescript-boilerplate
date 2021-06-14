import 'reflect-metadata';
import { expect } from 'chai';
import { authenticate } from '../../decorators/authenticate.decorator';
import 'mocha';
import dotenv from 'dotenv';
dotenv.config();

class SomeController {

    @authenticate({ userId: 'abc' })
    doWithVerifyToken(req: any, res: any) {
        return req.body;
    }

    doWithoutVerifyToken(req: any, res: any) {
        return req.dody;
    }
}
const req = {
    body: { email: '' },
    headers: { authorization: 'Bearer abc' }
};

describe('Auth decorator', () => {
    it('calls decorator on use', () => {
        const response = new SomeController().doWithVerifyToken(req, {});

        console.log({response});
        
        expect(response).to.have.property('userId');
    });

    xit('throws error when decorator not used', ()=>{
      expect(new SomeController().doWithoutVerifyToken(req, {})).to.not.have.property('userId');
    })
});
