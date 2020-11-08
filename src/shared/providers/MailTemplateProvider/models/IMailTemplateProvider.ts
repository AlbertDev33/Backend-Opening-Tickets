import IParseMailTemplateDTO from '@shared/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parseTemplate(data: IParseMailTemplateDTO): Promise<string>;
}
