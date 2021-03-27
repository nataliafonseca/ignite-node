import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoriesUseCase } from './ImportCategoriesUseCase';

class ImportCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request;

      const importCategoriesUseCase = container.resolve(
        ImportCategoriesUseCase,
      );

      await importCategoriesUseCase.execute(file);

      return response.status(201).send();
    } catch {
      return response
        .status(400)
        .json({ error: 'Could not import categories.' });
    }
  }
}

export { ImportCategoriesController };
