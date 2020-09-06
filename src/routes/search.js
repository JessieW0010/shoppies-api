import express    from 'express';
import controller from '../controllers/search.js';
import authenticate from '../helpers/authenticate.js';

const searchHandler = express.Router();

searchHandler.post(
  '/title',
  authenticate,
  controller.searchByTitle,
)

searchHandler.post(
  '/id',
  authenticate,
  controller.searchById,
)

export default searchHandler;
