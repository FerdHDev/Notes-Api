import logger from "./loggers.js";

/*const extractValidationErrors = (err) => {
    if (!err.errors) return [];

    return Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message,
        type: e.kind,
        value: e.value
    }));
};  */

const errorHandler = (err, res) => {
    if (err.name === "ValidationError") {
        const details = extractValidationErrors(err);
        return res.status(500).json({ error: "Validation Error", details })
    }

    if (err.name === "MongooseServerSelectionError") {
        return logger.error("Mongoose connection error", err)
    }


    if (err instanceof Error) return logger.error("error message:", err);

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue);
        const value = err.keyValue.username;
        res.status(403).send(`${field} field is unique - the value ${value} is already in use.`);
    }

    return res.status(500).json({ error: "something went wrong" })
}

export default errorHandler;
