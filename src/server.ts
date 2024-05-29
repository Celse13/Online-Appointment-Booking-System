import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './database/connection';
import routes from './routes/index';
import swaggerUi from 'swagger-ui-express';
import specs from './docs';

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(express.json());
app.use(cors());

app.use('/api', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error(`Failed to connect to the database: ${error}`);
  });
