import asyncHandler from "express-async-handler";

const indexPage = asyncHandler((req, res) => {
    res.status(200).send("Welcome to my home page");
})

export { indexPage } 
