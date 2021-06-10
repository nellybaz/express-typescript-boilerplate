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
            let emailSent = false
            if (createdRecord) {
                emailSent = await this.emailService.sendEmail({ receiver: payerEmail, subject: 'Payment Request', body: emailBody });
            }
            const emailSentResponseMessage = emailSent ? 'Email sent 👍🏾' : 'Email was not sent to payer. Click on resend email button';
            return {
                message: `Contracted created. ${emailSentResponseMessage}`
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }
}
