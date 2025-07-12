import asyncHandler from 'express-async-handler';
import logger from "../utilis/loggers.js"
import validator from "validator";

const createNote = asyncHandler(async (req, res) => {
    try {
        const { title, preview, content, tags } = req.body
        const cleanTitle = validator.escape(validator.trim(title));
        const cleanSnippet = validator.escape(validator.trim(preview));
        const cleanPreview = validator.escape(validator.trim(content));
        const cleanTags = validator.escape(validator.trim(tags));
    } catch (err) {
        console.log(err)
    }
})


export { createNote };
