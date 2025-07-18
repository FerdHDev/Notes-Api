import asyncHandler from "express-async-handler";
import validator from "express-validator";
import errorHandler from "../utilis/errorHandler.js";
import User from "../models/User.js";
import generateToken from "../utilis/generateToken.js";
import validateRegistrationInput from "../utilis/validate.js";
import logger from "../utilis/loggers.js";

const signUser = asyncHandler(async (req, res) => {
    try {
        const { errors } = await validateRegistrationInput(req);

        /*
         const cleanEmail = clean.email;
         let user = await User.findOne({ email: cleanEmail });
 
         if (user) {
             return res.status(400).send("This email exists in the database")
         }
 
         user = new User(clean);
         await user.save();
         res.status(201).send(user); */
    } catch (err) {
        errorHandler(err, res)
    }
})

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const cleanEmail = validator.escape(validator.normalizeEmail(validator.trim(email)));
        const cleanPswd = validator.escape(validator.trim(password));

        let user = await User.findOne({ email: cleanEmail });

        if (!user) {
            return res.status(400).send("Invalid Credentials");
        }

        console.log(user)

        const isMatch = await user.matchPassword(cleanPswd);
        if (!isMatch) {
            return res.status(400).send("Invalid Credentials");
        }

        const token = generateToken({ userId: user._id });
        res.status(200).json({ token, response: "User logged in successfully" });
    } catch (err) {
        console.log(err, { depth: null })
        errorHandler(err, res);
    }
})

export { signUser, loginUser }
