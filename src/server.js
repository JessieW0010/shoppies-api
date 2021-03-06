import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
const app = express();

import auth from './routes/auth.js';
import search from './routes/search.js';
import nominate from './routes/nominate.js';

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/auth', auth);
app.use('/search', search);
app.use('/nominate', nominate);

app.get('/healthcheck', (req, res) => {
  return res.status(200).json({
    msg: 'I\'m fine thanks for checking!'
  })
})

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server listening on port ${process.env.PORT || 8000}!`)
});