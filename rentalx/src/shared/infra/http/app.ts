import 'dotenv/config';
import '@shared/container';
import { handleErrors } from '@shared/infra/http/middleware/handleErrors';
import createConnection from '@shared/infra/typeorm';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import { router } from './routes';

createConnection();

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use(handleErrors);

export { app };
