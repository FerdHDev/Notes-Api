import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
    title: {
        type: string,
        required: true
    },
    snippet: {
        type: string,
        required: true
    }
})
