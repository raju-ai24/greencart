import express from 'express';

import { register, login, isAuth, logout, uploadProfileImage } from '../controllers/UserController.js';
import authUser from '../middlewares/authUser.js';
import { upload } from '../configs/multer.js';

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isAuth)
userRouter.get('/logout', authUser, logout)
userRouter.post('/upload-image', authUser, upload.single('image'), uploadProfileImage)

export default userRouter;