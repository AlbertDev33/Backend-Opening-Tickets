import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';

import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/providers/MailProvider/dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';

import mailConfig from '@config/mail';

export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(private mailTemplateProvider: IMailTemplateProvider) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_DEFAULT_REGION,
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parseTemplate(templateData),
    });
  }
}
