import { injectable } from 'inversify';
import { IEmailService, ISendEmailBody } from '../interfaces/emailservice.interface';
import mail from '@sendgrid/mail';
import config from '../../config';

@injectable()
export class InbuiltEmailService implements IEmailService {
    async sendEmail(data: ISendEmailBody) {
        try {
            // e449c144-32dd-4918-927c-e2f693704b71
            mail.setApiKey(config.server.sendGridKey);
            const msg = {
                to: data.receiver,
                from: 'hr@wejapa.com', // Use the email address or domain you verified above
                subject: data.subject,
                // text: data.body,
                html: `
                <h1>PAYMENT CONTRACT from PayDay</h1>
                <h3>${data.body}</h3>
                <a href="https://www.mypayday.africa/">Pay here</a>
                `
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
