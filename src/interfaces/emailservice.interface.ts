export interface ISendEmailBody{
  receiver:string,
  subject:string,
  body:string
}

export interface IEmailService{
  sendEmail:(data: ISendEmailBody)=>Promise<boolean>
}