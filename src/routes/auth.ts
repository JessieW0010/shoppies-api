import express    from 'express';
import controller from '../controllers/auth';

const authHandler = express.Router();

authHandler.post(
  '/signup',
  controller.signup,
)

export default authHandler;
