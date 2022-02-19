import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';

import router from './routes';
import connection from './config/db';

const app = express();

// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// routes middleware
app.use('/api', router);

// turn on the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});