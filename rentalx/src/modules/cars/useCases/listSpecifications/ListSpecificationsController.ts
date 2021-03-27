import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listSpecificationsUseCase = container.resolve(
        ListSpecificationsUseCase,
      );
      const specifications = await listSpecificationsUseCase.execute();

      return response.status(200).json(specifications);
    } catch {
      return response
        .status(400)
        .json({ error: 'Error listing specifications.' });
    }
  }
}

export { ListSpecificationsController };
