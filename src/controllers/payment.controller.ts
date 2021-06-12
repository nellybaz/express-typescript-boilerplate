import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import TYPES from '../../config/types';
import { StripePaymentService } from '../services';


@controller('/api')
export class PaymentController {
    constructor(@inject(TYPES.StripePaymentService) private service: StripePaymentService) {}

    /**
     * receives contract id from the request
     *
     *
     * @returns
     */
    @httpPost('/stripe/sessionid')
    async sessionId(req: Request, res: Response) {
        /**
         * TODO:
         *
         * 1 write test and clean up this module
         * 2 store sessionId, mapped to contract and status[paid or not]
         * 3 retrieve sessionId to get payerEmail and send out email notifications to both talent and payer
         * 4 checkout stripe webhooks to trigger 3 above
         * 4 mark contract as paid and other processing
         * 5 credit user's payday balance
         *
         *
         * => contract id should return error to the frontend when trying to get contract details for an already paid contract
         */
        return this.service.createSession(req.body);
    }
}
   