import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from '../controllers/userController';
import { authenticateToken } from '../middleware/authenticateToken';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', authenticateToken(), getUserProfile);
userRouter.put('/profile', authenticateToken(), updateUserProfile);
userRouter.delete('/:id', authenticateToken(), deleteUser);

export default userRouter;
