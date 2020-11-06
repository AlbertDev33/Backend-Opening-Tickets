import { container } from 'tsyringe';

import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/providers/MailProvider/implementations/EtherealMailProvider';

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
