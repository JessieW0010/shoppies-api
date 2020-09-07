import express from 'express';
import bodyParser from 'body-parser';
const app = express();

import auth from './routes/auth.js';
import search from './routes/search.js';
import nominate from './routes/nominate.js';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', auth);
app.use('/search', search);
app.use('/nominate', nominate);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server listening on port 8000!')
});