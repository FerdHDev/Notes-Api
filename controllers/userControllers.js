import asyncHandler from "express-async-handler";
import validator from "express-validator";
import errorHandler from "../utilis/errorHandler.js";
import User from "../models/User.js";
import generateToken from "../utilis/generateToken.js";
import { validateRequest } from "../utilis/validate.js";
import logger from "../utilis/loggers.js";
import { sendSecurityNotice } from "../config/mailer.js";


const signUser = asyncHandler(async (req, res) => {
    try {
        let clean, user;
        const validationResult = await validateRequest(req);

        if (!validationResult.isValid) {
            const errors = validationResult.errors.map(error => error.msg)
            return res.status(400).send(errors);
        }

        clean = validationResult.sanitizedData;

        if (clean.age < 18) return res.status(401).send("Age must in between 18 and 120 years");

        user = await User.findOne({ email: clean.email });

        if (user) {
            sendSecurityNotice(user);
            return res.status(400).send("This email has already in use");
        }

        user = new User(clean);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        // errorHandler(err, res)
        logger.error(err);
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
