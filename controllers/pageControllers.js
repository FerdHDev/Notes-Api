import asyncHandler from "express-async-handler";

const indexPage = asyncHandler(async (req, res) => {
    res.status(200).render("notes/index")
})

export { indexPage } 
