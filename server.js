import dotenv from 'dotenv';
import express from "express";
import helmet from 'helmet';
import routes from './routes/router.js';
import logger from './utilis/loggers.js';
import connectDB from "./config/connectDB.js";
// import initTags from "./config/initTags.js";

(async () => {
    await connectDB();
})()

dotenv.config();
const app = express();

app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(helmet());

const Port = process.env.PORT || 3030;
app.listen(Port, () => logger.info(`[server] is live on: http://localhost:${Port}`))
