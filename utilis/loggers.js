import fs from 'fs';
import pkg from 'winston';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


const { createLogger, format, level, transports } = pkg;
const { combine, timestamp, printf, colorize } = format;
const customFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const logsDir = path.join(__dirname, 'logs')
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
}

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        colorize(),
        customFormat
    ), transports: [new pkg.transports.Console(),
    new pkg.transports.File({ filename: path.join(logsDir, 'app.log') })
    ]
})

export default logger;
