import { ImportCategoriesUseCase } from '@modules/cars/useCases/importCategories/ImportCategoriesUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ImportCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase);

    await importCategoriesUseCase.execute(file);

    return response.status(201).send();
  }
}

export { ImportCategoriesController };
