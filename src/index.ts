import "reflect-metadata";
import "express-async-errors";
import './app/database';

import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import serverError from "./app/middlewares/server-err";

import routes from './app/routes';

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(serverError);

app.listen( process.env.API_PORT, () => (
    console.log(` Server Started At ${process.env.API_PORT} 🔥👨‍💻`)
));
