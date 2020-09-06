import express from 'express';
const app = express();

import auth from './routes/auth.js';

app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(8000, () => {
  console.log('Server listening on port 8000!')
});