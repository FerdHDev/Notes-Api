import asyncHandler from 'express-async-handler';
import logger from "../utilis/loggers.js"
import validator from "validator";

const createNote = asyncHandler(async (req, res) => {
    try {
        const { title, preview, content, tags, referenceUrl, isPrivate } = req.body
        const cleanTitle = validator.escape(validator.trim(title));
        const cleanSnippet = validator.escape(validator.trim(preview));
        const cleanPreview = validator.escape(validator.trim(content));
        const cleanTags = validator.escape(validator.trim(tags));
        const cleanUrl = validator.escape(validator.trim(referenceUrl));
        const cleanIsPrivate = validator.escape(validator.trim(isPrivate));
    } catch (err) {
        console.log(err)
    }
})


export { createNote };
