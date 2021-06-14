import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import TYPES from '../../config/types';
import { authenticate, authorize } from '../decorators';
import { TalentContractService } from '../services/talent-contract.service';

@controller('/api/contract')
export class TalentContract {
    constructor(@inject(TYPES.TalentContractService) private talentContractService: TalentContractService) {}

    @httpPost('/')
    @authenticate({})
    create(req: Request, res: Response) {
        return this.talentContractService.generate(req.body);
    }

    @httpPost('/paid')
    @authenticate({})
    @authorize({})
    markPaid(req: Request, res: Response) {
        return this.talentContractService.processPaidContract(req.body)
    }
}
