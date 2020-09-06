import express from 'express';
import bodyParser from 'body-parser';
const app = express();

import auth from './routes/auth.js';
import search from './routes/search.js';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', auth);
app.use('/search', search);

app.listen(8000, () => {
  console.log('Server listening on port 8000!')
});