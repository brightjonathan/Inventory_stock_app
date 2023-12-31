import asyncHandler from 'express-async-handler';
import User from '../model/user.model.js';
import TokenModel from '../model/token.model.js';
import {errorHandler} from '../middlewares/errors.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendEmail } from '../utils/sendEmail.js';



//@desc      GET_USER funct...
//@route    GET /api/profile/getuser
//@access    public
export const getUser = asyncHandler(async (req, res, next)=>{

    //the req.user._id (user) is coming from the verify.user.js
  const GetUser = await User.findById(req.user._id);
  try {
      if (GetUser) {
        //hiding the password 
        const {password: pass, ...rest } = GetUser._doc;
        res.status(201).json(rest);
      }else{
        next(errorHandler(401, 'user  not found'));
      }
  } catch (error) {
    next(error)
  };
});


//@desc      LoggedIn STATUS funct...
//@route    GET /api/profile/userlogin
//@access    public
export const loginStatus = asyncHandler(async(req, res, next)=>{

    try {
        const token = req.cookies.access_token;
        if (!token) {
            res.status(200).json({ success: false, message: "User is not logged in" });
            return;
        }
        // Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified) {
            res.status(200).json(true);
        } else {
            res.status(200).json(false);
        }
    } catch (error) {
        next(error);
    }  
});



//@desc      UPDATE_USER funct...
//@route    PATCH /api/profile/updateprofile
//@access    public
export const updatedUser = asyncHandler(async (req, res, next)=>{
  try {
    const userExist = await User.findById(req.user._id);

     // Check if the user(from verify.user.js) is allowed to update their account
     if (!userExist) {
      return next(errorHandler(403, 'You can only update your own account!'));
     }

      // Update the user and get the updated user data
      const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            bio: req.body.bio,
            phone: req.body.phone,
            photo: req.body.photo,
        }
    }, { new: true });

    if (!updatedUser) {
        return next(errorHandler(404, 'User not found')); // Handle the case where the user doesn't exist
    }

      // Separate the password from the rest
      const {...rest } = updatedUser._doc; // Use _doc to access document properties

      res.status(200).json(rest);

  } catch (error) {
    next(error);    
  }
});


//@desc      UPDATE_USER_PASSWORD funct...
//@route    PATCH /api/profile/changepassword
//@access    public
export const passwordChange = asyncHandler(async (req, res, next) => {
  try {
    // Retrieve the user
    const userExist = await User.findById(req.user._id);

    // If no user
    if (!userExist) {
      return next(errorHandler(400, 'User does not exist'));
    }

    const { oldpassword, password } = req.body;

    // Validation
    if (oldpassword === '' || password === '') {
      return next(errorHandler(400, 'Please fill in the required fields'));
    }

    // Checking if old password matches the stored password
    const passwordIsCorrect = bcrypt.compareSync(oldpassword, userExist.password);

    // Save new password
    if (passwordIsCorrect) {
      userExist.password = password;
      await userExist.save();
      res.status(200).json('Password changed successfully');
    } else {
      return next(errorHandler(404, 'Password is incorrect'));
    }
  } catch (error) {
    return next(error);
  }
});



//@desc      FORGOTTEN_PASSWORD funct...
//@route    POST /api/profile/forgotpassword
//@access    public
export const ForgotenPassword = asyncHandler(async (req, res, next)=>{
  const {email} = req.body;

  //validating the input fields
  if (!email ) return next(errorHandler(400, 'please, fill in the required fields'));

  const userExit = await User.findOne({email});

  if (!userExit) return next(errorHandler(404, 'user does not exist'));

  // Delete token if it exists in DB
  let token = await TokenModel.findOne({ userId: userExit._id });
  if (token) {
    await token.deleteOne();
  }

  //create re-set token
  let resetToken = crypto.randomBytes(32).toString("hex") + userExit._id;
  console.log(resetToken);
  
  //hashing the password in forgotten password
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  //saving hashedToken to TokenModel db
  await new TokenModel({
    userId: userExit._id,
    token: hashedToken,  
    createdAt: Date.now(),  //current date and time 
    expiresAt: Date.now() + 30 * (60 * 1000) //expires in 30mins time
  }).save();

  //contruct a reset url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  //re-set email
  const message = `
      <h2>Hello ${userExit.username}</h2>
      <p>Please use the url below to reset your password</p>  
      <p>This reset link is valid for only 30minutes.</p>

      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

      <p>Regards...</p>
      <p>e-ventory Team</p>
    `;

    const subject = "Password Reset Request";
    const send_to = userExit.email;
    const sent_from = process.env.EMAIL_USER;

    try {
        await sendEmail(subject, message, send_to, sent_from);
        res.status(200).json({ success: true, message: "Reset Email Sent" });
      } catch (error) {
        next(errorHandler(500, 'Email not sent, please try again'));
      }
});


//@desc      RESET_PASSWORD funct...
//@route    PUT /api/profile/resetpassword
//@access    public
export const resetPassword = asyncHandler(async (req, res, next)=>{
    const {password} = req.body;
    const {resetToken} = req.params;

    if(!password) return next(errorHandler(400, 'please fill in the required input field'));

     // Hash token, then compare to Token in DB
  const hashedToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

  // fIND tOKEN in DB
  const userToken = await TokenModel.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

    if (!userToken) return next(errorHandler(404, 'Invalid or Expired Token'));

     // Find user
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  res.status(200).json({
    message: "Password Reset Successful, Please Login",
  });

});
