import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './app/routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.API_PORT || 3001, () => (
    console.log(` Server Started At ${process.env.API_PORT} 🔥👨‍💻`)
));
