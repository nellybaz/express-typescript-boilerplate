import { inject, injectable, named } from 'inversify';
import TYPES from '../../config/types';
import { IEmailService } from '../interfaces/emailservice.interface';
import { TalentContractRepository } from '../repository/talent-contract.repository';

@injectable()
export class TalentContractService {
    constructor(@inject(TYPES.TalentContractRepository) private _repo: TalentContractRepository, @inject(TYPES.IEmailService) @named('inbuiltEmailService') private emailService: IEmailService) {}

    async createContract(data: any) {
        try {
            const createdRecord = await this._repo.create({ ...data, isPaid: false, dueDate: new Date() });
            const payerEmail = createdRecord.payerEmail;
            const ownerName = 'Talent Name';
            const currency = createdRecord.currency;
            const amount = createdRecord.amount;
            const emailBody = `${ownerName} sent you a payment contract. Amount: ${currency}${amount}`;
            if (createdRecord) this.emailService.sendEmail({ receiver: payerEmail, subject: 'Payment Request', body: emailBody });
            return {
                message: 'Contracted created and email sent 👍🏾'
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }
}
