import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import { ListRentalsByUserController } from '../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { ReturnRentalController } from '../../../../modules/rentals/useCases/returnRental/ReturnRentalController';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnRentalController = new ReturnRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post(
  '/return/:id',
  ensureAuthenticated,
  returnRentalController.handle,
);
rentalsRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);

export { rentalsRoutes };
