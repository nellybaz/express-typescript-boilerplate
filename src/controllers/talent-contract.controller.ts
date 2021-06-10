import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import TYPES from '../../config/types';
import { TalentContractService } from '../services/talent-contract.service';

@controller('/api/contract')
export class TalentContract {
    constructor(@inject(TYPES.TalentContractService) private talentContractService: TalentContractService) {}

    @httpPost('/')
    create(req: Request, res: Response) {
        return this.talentContractService.createContract(req.body);
    }
}
