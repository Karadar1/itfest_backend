import winston from 'winston';
import moment from 'moment-timezone';

const timezone = 'Europe/Bucharest';

const timestampFormat = winston.format((info, opts) => {
  if (opts.tz)
    info.timestamp = moment().tz(opts.tz).format('HH:mm:ss // YYYY-MM-DD');
  return info;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    timestampFormat({ tz: timezone }),
    winston.format.json()
  ),
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        timestampFormat({ tz: timezone }),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
