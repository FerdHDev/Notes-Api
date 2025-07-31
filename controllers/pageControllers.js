import asyncHandler from "express-async-handler";

const indexPage = asyncHandler(async (req, res) => {
    res.status(200).render("notes/index", { title: "NoteBlog -  " })
})

const loginPage = asyncHandler(async (req, res) => {
    res.status(200).render("notes/login", {
        title: "NoteBlog - login",
        errors: "",
        error: ""
    })
})

export { indexPage, loginPage } 
