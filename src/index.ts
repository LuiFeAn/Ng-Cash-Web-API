import "reflect-metadata";

import "express-async-errors";

import './app/database';

import express, { Application } from 'express';

import cors from 'cors';

import dotenv from 'dotenv';

import serverError from "./app/middlewares/server-err";

import { mainrRoutes } from "./app/routes/main";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(cors());

app.use(mainrRoutes);

app.use(serverError);

export { app }
