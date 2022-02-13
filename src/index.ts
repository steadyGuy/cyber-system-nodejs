import './config/dotenvConf';
import express from 'express';
import cors from 'cors';

import router from './routes';

const app = express();

// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// routes middleware
app.use('/api', router);

// turn on the server
const PORT = process.env.PORT || 3002;

connection.once('open', () => {
  console.log('Mongodb connection established successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});