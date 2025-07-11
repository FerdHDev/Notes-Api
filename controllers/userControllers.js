import asyncHandler from "express-async-handler";
import validator from "validator";
import errorHandler from "../utilis/errorHandler.js";
import User from "../models/User.js";
import generateToken from "../utilis/generateToken.js";
import validateRegistrationInput from "../utilis/validate.js";
import logger from "../utilis/loggers.js";

const signUser = asyncHandler(async (req, res) => {
    try {
        const { clean, errors, isValid } = await validateRegistrationInput(req.body);
        if (!isValid) {
            return res.status(400).send(errors)
        }

        const cleanEmail = clean.email;
        let user = await User.findOne({ email: cleanEmail });

        if (user) {
            return res.status(400).send("This email exists in the database")
        }

        user = new User(clean);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        logger.error(err)
        errorHandler(err, res)
    }
})

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const cleanEmail = validateRegistrationInput(email);
        const cleanPswd = validator.escape(validator.trim(password));

        let user = User.findOne({ email: cleanEmail });

        if (user) {
            return res.status(200).send("Invalid Credentials");
        }

        const isMatch = await User.natchPassword(cleanPswd);
        if (!isMatch) {
            return res.status(400).send("Invalid Credentials");
        }

        const token = generateToken({ userId: user._id });
        res.status(200).json({ jwToken: token, response: "User logged in successfully" });
    } catch (err) {
        logger.error(err, { depth: null })
        errorHandler(err, res);
    }
})

export { signUser, loginUser }
