import logger from "./loggers.js";

const extractValidationErrors = (err) => {
    if (!err.errors) return [];

    return Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message,
        type: e.kind,
        value: e.value
    }));
};

const errorHandler = (err, res) => {
    if (err.name === "ValidationError") {
        const details = extractValidationErrors(err);
        return res.status(500).json({ error: "Validation Error", details })
    }

    if (err.name === "MongooseServerSelectionError") {
        return logger.error("Mongoose connection error", err)
    }


    if (err instanceof Error) {
        return logger.error("error message:", err)
    }

    return res.status(500).json({ error: "something went wrong" })
}

export default errorHandler;
