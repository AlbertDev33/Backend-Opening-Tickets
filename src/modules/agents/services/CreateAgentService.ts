import Agent from '@modules/agents/infra/typeorm/entities/Agent';
import IAgentRepository from '@modules/agents/repositories/IAgentsRespository';
import IHashProivider from '@shared/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateAgentService {
  constructor(
    private agentRepository: IAgentRepository,

    private hashProvider: IHashProivider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<Agent> {
    const agentExists = await this.agentRepository.findByEmail(email);

    if (agentExists) {
      throw new AppError('Agent already registered');
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const agent = await this.agentRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    return agent;
  }
}

export default CreateAgentService;
