import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateAgentService from '@modules/agents/services/CreateAgentService';
import AgentsReponsitory from '@modules/agents/infra/typeorm/repositories/AgentsRepository';
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';

export default class AgentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const agentsRepository = new AgentsReponsitory();
    const bcryptHashProvider = new BCryptHashProvider();

    const createAgent = new CreateAgentService(
      agentsRepository,
      bcryptHashProvider,
    );

    const agent = await createAgent.execute({
      name,
      email,
      password,
    });

    return response.json({ agent: classToClass(agent) });
  }
}
