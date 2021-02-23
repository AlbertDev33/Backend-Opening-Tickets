import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/providers/MailProvider/dtos/ISendMailDTO';

import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

const handlebarsMailTemplate = new HandlebarsMailTemplateProvider();

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(private mailTemplateProvider: IMailTemplateProvider) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe de Tickets',
        address: from?.email || 'equipe@tickets.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parseTemplate(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new EtherealMailProvider(handlebarsMailTemplate);
