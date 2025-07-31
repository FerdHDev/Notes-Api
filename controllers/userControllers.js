import asyncHandler from "express-async-handler";
import { IPinfoWrapper } from "node-ipinfo";
import User from "../models/User.js";
import generateToken from "../utilis/generateToken.js";
import { validateRequest, validateLoginReq } from "../utilis/validate.js";
import logger from "../utilis/loggers.js";
import { sendLoginAlert, sendSecurityNotice } from "../config/mailer.js";


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
        user.ipAddress = "197.210.84.32";
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        const field = Object.keys(err.keyValue);
        const value = err.keyValue.username; res.status(403).send(`${field} field is unique - the value ${value} is already in use.`);
    }
})

const loginUser = asyncHandler(async (req, res) => {
    try {
        let clean, user, loginTime;
        const validationResult = await validateLoginReq(req);

        if (!validationResult.isValid) {
            const errors = validationResult.errors.map(error => error.msg)
            return res.status(400).render("notes/login", {
                title: "NoteBlog - Login",
                errors,
                error: ""
            })
        }

        clean = validationResult.sanitizedData;

        user = await User.findOne({ email: clean.email });

        if (!user) {
            return res.status(400).render("notes/login", {
                title: "NoteBlog - Login",
                error: "Invalid Credentials",
                errors: ""
            });
        }
        const isMatch = await user.matchPassword(clean.password);
        if (!isMatch) {
            return res.status(400).render("notes/login", {
                title: "NoteBlog - Login",
                error: "Invalid Credentials",
                errors: ""
            });
        }

        if (user.ipAddress !== req.body.ipAddress) {
            loginTime = new Date().toLocaleTimeString()
            const ipInfoWrapper = new IPinfoWrapper("dd68644026218a");
            const ipInfo = await ipInfoWrapper.lookupIp("197.210.84.32");
            sendLoginAlert(user, ipInfo, loginTime);
        }

        generateToken({ userId: user._id });
        res.status(200).send("User logged in successfully");

    } catch (err) {
        console.log(err, { depth: null })
    }
})

export { signUser, loginUser }
