import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './database/connection';

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(express.json());
app.use(cors());

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error(`Failed to connect to the database: ${error}`);
  });
