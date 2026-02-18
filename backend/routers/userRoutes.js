import express from 'express';
const userRouter = express.Router();
import { getUserProfile, loginUser, registerUser } from './../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

//protected route as token will be required
userRouter.get('/profile',protect, getUserProfile);

export default userRouter