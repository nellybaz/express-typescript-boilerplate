import { inject, injectable, named } from 'inversify';
import { any } from 'joi';
import TYPES from '../../config/types';
import { IEmailService } from '../interfaces/emailservice.interface';
import { TalentContractRepository } from '../repository/talent-contract.repository';

@injectable()
export class TalentContractService {
    private contract: any = null;

    constructor(@inject(TYPES.TalentContractRepository) private _repo: TalentContractRepository, @inject(TYPES.IEmailService) @named('inbuiltEmailService') private emailService: IEmailService) {}

    async generate(data: any) {
        try {
            await this.createContract(data);
            const notificationSent =await this.sendNotificationToPayer()
            if(notificationSent) await this.markContractWhenEmailSent()
            const emailSentResponseMessage = notificationSent ? 'Email sent 👍🏾' : 'Email was not sent to payer. Click on resend email button';
            return {
                message: `Contracted created. ${emailSentResponseMessage}`
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }

    async createContract(data: any) {
        try {
            this.contract = await this._repo.create({ ...data, isPaid: false, dueDate: new Date(), emailSent: false });
            return true;
        } catch (error: any) {
            throw Error(error.message);
        }
    }

    async sendNotificationToPayer(): Promise<boolean> {
        try {
            if (this.contract) {
                console.log('Trying to send email notification!!');
                
                const ownerName = 'Mike Emeka';
                const emailBody = `${ownerName} sent you a payment contract. Amount: ${this.contract.currency}${this.contract.amount}`;
                return await this.emailService.sendEmail({ receiver: this.contract.payerEmail, subject: 'Payment Request', body: emailBody });
            }
        } catch (error) {}
        return false;
    }

    async markContractWhenEmailSent(){
        await this._repo.updateOne({ _id: this.contract._id }, { emailSent: true });
    }
}
