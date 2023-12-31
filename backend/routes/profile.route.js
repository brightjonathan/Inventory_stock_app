import express from 'express';
import { 
    ForgotenPassword,
    getUser, 
    loginStatus, 
    passwordChange, 
    resetPassword, 
    updatedUser 
} from '../controllers/profile.controller.js';
import { VerifyUserToken } from '../middlewares/verify.user.js';
const profileRouter = express.Router();

profileRouter.get('/getuser', VerifyUserToken, getUser);
profileRouter.get('/userlogin', loginStatus );
profileRouter.patch('/updateprofile', VerifyUserToken, updatedUser);
profileRouter.patch('/changepassword', VerifyUserToken, passwordChange);
profileRouter.post('/forgotpassword', ForgotenPassword);
profileRouter.put('/resetpassword/:resetToken', resetPassword)

export default profileRouter;


