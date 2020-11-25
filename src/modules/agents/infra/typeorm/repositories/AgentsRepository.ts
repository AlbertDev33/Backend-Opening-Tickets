import { getRepository, Repository } from 'typeorm';

import IAgentsRepository from '@modules/agents/repositories/IAgentsRespository';
import ICreateAgentDTO from '@modules/agents/dtos/ICreateAgentDTO';

import Agent from '@modules/agents/infra/typeorm/entities/Agent';

class AgentRepository implements IAgentsRepository {
  private ormRepository: Repository<Agent>;

  constructor() {
    this.ormRepository = getRepository(Agent);
  }

  public async findById(id: string): Promise<Agent | undefined> {
    const agentId = await this.ormRepository.findOne(id);

    return agentId;
  }

  public async findByEmail(email: string): Promise<Agent | undefined> {
    const agentEmail = await this.ormRepository.findOne({
      where: { email },
    });

    return agentEmail;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateAgentDTO): Promise<Agent> {
    const agent = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(agent);

    return agent;
  }

  public async save(agent: Agent): Promise<Agent> {
    await this.ormRepository.save(agent);

    return agent;
  }
}

export default AgentRepository;
