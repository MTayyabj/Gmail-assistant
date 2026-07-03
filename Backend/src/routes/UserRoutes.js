import express from 'express'
import userAuth from '../middlewares/UserAuth.js'
import {getUserData, deleteUserAccount} from '../controllers/UserControllers.js'

const userRouter = express.Router();

userRouter.get ('/data', userAuth, getUserData);
userRouter.delete('/delete', userAuth, deleteUserAccount);
 
export default userRouter;
