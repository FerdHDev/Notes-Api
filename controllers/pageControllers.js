import uaParser from 'ua-parser-js';
import asyncHandler from "express-async-handler";

const indexPage = asyncHandler((req, res) => {

    const userAgent = req.headers['user-agent'];
    const parser = new uaParser(userAgent);
    console.log(parser)
    res.status(200).send("Welcome to my home page");
})

export { indexPage } 
