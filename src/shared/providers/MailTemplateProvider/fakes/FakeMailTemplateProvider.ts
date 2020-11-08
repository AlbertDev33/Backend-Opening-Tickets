import IParseMailTemplateDTO from '@shared/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parseTemplate({
    template,
  }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
