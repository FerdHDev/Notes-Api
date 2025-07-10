import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import logger from "../utilis/loggers.js";
import errorHandler from "../utilis/errorHandler.js";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info("MongoDB connected");
    } catch (err) {
        errorHandler(err);
        process.exit(1);
    }
}

export default connectDB;
