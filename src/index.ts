import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { apiDoc } from '../docs/doc';
import cors from 'cors';
import dotenv from 'dotenv';
import { initRoutes } from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDoc));

initRoutes(app);

app.get('/', (req, res) => {
  res.send('Sever is running! Go to /docs to see the documentation.');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
