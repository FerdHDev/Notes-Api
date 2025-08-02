import asyncHandler from "express-async-handler";

export const dashPage = asyncHandler(async (req, res) => {
    res.render("dashboard/dashboard", {
        title: "NoteBlog - Dashboard"
    })
})

export const dashNotes = asyncHandler(async (req, res) => {
    res.render("dashboard/dashNotes", {
        title: "NoteBlog - Dashboard Notes"
    })
})
