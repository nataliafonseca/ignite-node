import 'dotenv/config';
import upload from '@config/upload';
import '@shared/container';
import { handleErrors } from '@shared/infra/http/middleware/handleErrors';
import createConnection from '@shared/infra/typeorm';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import { router } from './routes';

createConnection();

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));
app.use(cors({ origin: '*' }));
app.use(router);
app.use(handleErrors);

export { app };
