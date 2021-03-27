import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
      const categories = await listCategoriesUseCase.execute();
      return response.status(200).json(categories);
    } catch {
      return response.status(400).json({ error: 'Could not list categories.' });
    }
  }
}

export { ListCategoriesController };
