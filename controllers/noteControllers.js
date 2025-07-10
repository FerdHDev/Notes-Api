import asyncHandler from 'express-async-handler';

export const getHome = asyncHandler((req, res) => {
    res.status(200).send('Home Page')
})
