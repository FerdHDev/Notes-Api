import asyncHandler from "express-async-handler";
import errorHandler from "../utilis/errorHandler.js";
import User from "../models/User.js";
import generateToken from "../utilis/generateToken.js";
import validateRegUser from "../utilis/validate.js";
import logger from "../utilis/loggers.js";

const signUser = asyncHandler(async (req, res) => {
    try {
        const { clean, errors, isValid } = validateRegUser(req.body);

        if (!isValid) {
            return res.status(400).send(errors)
        }

        let user = User.findOne(clean.email);
        if (!user) {
            return res.status(400).send("Email already saved in database")
        }

        user = new User(clean)
        await user.save();
        res.status(201).send(user)
    } catch (err) {
        errorHandler(err, res)
    }
})

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = User.findOne(email);

        if (user) {
            return res.status(200).send("Invalid Credentials");
        }

        const isMatch = await User.natchPassword(password);
        if (!isMatch) {
            return res.status(400).send("Invalid Credentials");
        }

        const token = generateToken({ userId: user._id });
        res.status(200).send("User logged in successfully");

    } catch (err) {
        logger.error(err, { depth: null })
        errorHandler(err, res)
    }
})

export { signUser, loginUser }
