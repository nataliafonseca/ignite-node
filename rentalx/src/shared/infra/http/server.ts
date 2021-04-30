import '@shared/container';
import { handleErrors } from '@shared/infra/http/middleware/handleErrors';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import '@shared/infra/typeorm';
import { router } from './routes';
import swaggerFile from '../../../swagger.json';

const app = express();
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use(handleErrors);

app.listen(3333, () => console.log('🔥 Server is running on localhost:3333'));
