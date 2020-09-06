import express    from 'express';
import controller from '../controllers/nominate.js';
import authenticate from '../helpers/authenticate.js';
const nominateHandler = express.Router();

nominateHandler.post(
  '/',
  authenticate,
  controller.nominateMovies,
)

export default nominateHandler;
