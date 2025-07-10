import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(\+234|0)[789][01]\d{8}$/.test(v);
            },
            message: props => `"${props.value}" is not a valid Nigerian phone number.`
        }
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Prefer not to say"],
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 30,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
}, {
    toJSON: { getters: true },
    toObject: { getters: true }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
userSchema.pre("save", async function() {
    if (!this.isModified(password)) return next();

    const salt = bcryptjs.gensalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
})
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
}
export default User;
