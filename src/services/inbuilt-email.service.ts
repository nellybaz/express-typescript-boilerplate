import { injectable } from 'inversify';
import { IEmailService, ISendEmailBody } from '../interfaces/emailservice.interface';
import mail from '@sendgrid/mail';
import config from '../../config';
import { AnyPtrRecord } from 'dns';

@injectable()
export class InbuiltEmailService implements IEmailService {
    async sendEmail(data: ISendEmailBody) {
        try {
            mail.setApiKey(config.server.sendGridKey);
            const msg = {
                to: data.receiver,
                from: 'contract@talentmatch.africa', // Use the email address or domain you verified above
                subject: data.subject,
                text: data.body
                // html: '<strong>and easy to do anywhere, even with Node.js</strong>'
            };
            await mail.send(msg);
            console.log('Email sent');
        } catch (error: any) {
            console.log('Error sending email');
            console.log(error.message);

            return false;
        }
        return true;
    }
}
