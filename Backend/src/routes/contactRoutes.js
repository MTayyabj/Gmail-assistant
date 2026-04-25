import express from 'express'
import {getUserContacts, addContact, deleteContact, updateContact } from '../controllers/ContactControllers.js';
import userAuth from '../middlewares/UserAuth.js'
 
const authRouter = express.Router();
 
authRouter.post('/get', userAuth, getUserContacts );
authRouter.post('/update', userAuth, updateContact );
authRouter.post('/delete', userAuth, deleteContact );
authRouter.post('/add', userAuth, addContact );

export default authRouter;
