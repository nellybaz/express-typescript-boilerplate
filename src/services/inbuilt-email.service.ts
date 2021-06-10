import { IEmailService, ISendEmailBody } from "../interfaces/emailservice.interface";

export class InbuiltEmailService implements IEmailService{
  async sendEmail(data: ISendEmailBody){
    return true
  }
}