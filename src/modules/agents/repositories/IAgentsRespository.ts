import Agent from '@modules/agents/infra/typeorm/entities/Agent';
import ICreateAgentDTO from '@modules/agents/dtos/ICreateAgentDTO';

export default interface IAgentsRepository {
  findById(id: string): Promise<Agent | undefined>;
  findByEmail(email: string): Promise<Agent | undefined>;
  create(data: ICreateAgentDTO): Promise<Agent>;
  save(agent: Agent): Promise<Agent>;
}
