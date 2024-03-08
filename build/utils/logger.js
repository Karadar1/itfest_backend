"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const timezone = 'Europe/Bucharest';
const timestampFormat = winston_1.default.format((info, opts) => {
    if (opts.tz)
        info.timestamp = (0, moment_timezone_1.default)().tz(opts.tz).format('HH:mm:ss // YYYY-MM-DD');
    return info;
});
const logger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston_1.default.format.combine(timestampFormat({ tz: timezone }), winston_1.default.format.json()),
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(timestampFormat({ tz: timezone }), winston_1.default.format.simple()),
    }));
}
exports.default = logger;
