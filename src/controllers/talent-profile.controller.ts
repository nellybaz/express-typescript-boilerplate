import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import TYPES from '../../config/types';
import { TalentProfileService } from '../services/talent-profile.service';


@controller('/api/talent')
export class TalentProfile {
    constructor(@inject(TYPES.TalentProfileService) private talentProfileService: TalentProfileService) {}

    @httpPost('/create')
    async create(req: Request, res: Response) {
        return await this.talentProfileService.create(req.body);
    }
}
