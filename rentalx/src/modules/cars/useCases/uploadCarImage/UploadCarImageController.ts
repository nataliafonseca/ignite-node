import { UploadCarImageUseCase } from '@modules/cars/useCases/uploadCarImage/UploadCarImageUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];
    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const images_name = images.map((image) => image.filename);

    const carImages = await uploadCarImageUseCase.execute({
      car_id: id,
      images_name,
    });

    return response.status(201).json(carImages);
  }
}

export { UploadCarImageController };
