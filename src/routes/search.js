import express    from 'express';
import controller from '../controllers/search.js';

const searchHandler = express.Router();

searchHandler.post(
  '/title',
  controller.searchByTitle,
)

searchHandler.post(
  '/id',
  controller.searchById,
)

export default searchHandler;
