import express    from 'express';
import controller from '../controllers/auth.js';

const authHandler = express.Router();

authHandler.post(
  '/register',
  controller.register,
)

authHandler.post(
  '/login',
  controller.login,
)

export default authHandler;
