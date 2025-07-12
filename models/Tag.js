import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema({
    name: {
        title: String,
        required: true,
    },
    status: {
        title: String,
        enum: ["approved", "pending"],
        default: "pending"
    },
}, {
    tineStamps: true
})

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
