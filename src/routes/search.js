import express    from 'express';
import controller from '../controllers/search.js';

const searchHandler = express.Router();

searchHandler.post(
  '/',
  controller.search,
)

export default searchHandler;
