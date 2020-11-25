import { uuid } from 'uuidv4';

import IAgentsRepository from '@modules/agents/repositories/IAgentsRespository';
import ICreateAgentDTO from '@modules/agents/dtos/ICreateAgentDTO';

import Agent from '@modules/agents/infra/typeorm/entities/Agent';

class FakeAgentsRepository implements IAgentsRepository {
  private agents: Agent[] = [];

  public async findById(id: string): Promise<Agent | undefined> {
    const findAgent = this.agents.find(agent => agent.id === id);

    return findAgent;
  }

  public async findByEmail(email: string): Promise<Agent | undefined> {
    const findAgentByEmail = this.agents.find(agent => agent.email === email);

    return findAgentByEmail;
  }

  public async create(agentData: ICreateAgentDTO): Promise<Agent> {
    const agent = new Agent();

    Object.assign(agent, { id: uuid() }, agentData);

    this.agents.push(agent);

    return agent;
  }

  public async save(agent: Agent): Promise<Agent> {
    const agentData = new Agent();

    this.agents.push(agent);

    return agentData;
  }
}

export default FakeAgentsRepository;
