import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import './database';
import { handleErrors } from './middleware/handleErrors';
import { router } from './routes';
import './shared/container';
import swaggerFile from './swagger.json';

const app = express();
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use(handleErrors);

app.listen(3333, () => console.log('Server is running!'));
