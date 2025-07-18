import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    preview: {
        type: String,
        required: true
    },
    content: String,
    tags: {
        type: String,
        enum: ["work", "personal", "school", "music", "inspiration"],
        required: true
    },
    // suggestedTags: [String],
    referencUrl: String,
    isPrivate: {
        type: Boolean,
        enum: ["true", "false"],
        default: "false",
    },
    userId: {
        type: mongoose.Schema.ObjectId(),
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, {
    timeStamps: true
})

const Note = mongoose.model("Note", noteSchema);
export default Note;
