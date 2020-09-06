import express    from 'express';
import controller from '../controllers/auth.js';

const authHandler = express.Router();

authHandler.post(
  '/register',
  controller.register,
)

export default authHandler;
