import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private SpecificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const SpecificationAlreadyExists = this.SpecificationsRepository.findByName(
      name,
    );

    if (SpecificationAlreadyExists) {
      throw new Error('Specification already exists!');
    }

    this.SpecificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
