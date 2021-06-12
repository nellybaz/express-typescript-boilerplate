import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import TYPES from '../../config/types';
import { TalentProfileService } from '../services/talent-profile.service';


@controller('/api/contract')
export class TalentProfile {
    constructor(@inject(TYPES.TalentProfileService) private talentProfileService: TalentProfileService) {}

    @httpPost('/')
    create(req: Request, res: Response) {
        return this.talentProfileService.update(req.body);
    }
}
