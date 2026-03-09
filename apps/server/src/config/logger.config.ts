import * as winston from 'winston';

const isDev = process.env.NODE_ENV !== 'production';

export const loggerConfig = {
  transports: [
    new winston.transports.Console({
      format: isDev
        ? winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'HH:mm:ss' }),
            winston.format.printf(({ timestamp, level, message, context }) =>
              `[${timestamp}] ${level} [${context || 'App'}] ${message}`
            ),
          )
        : winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
    }),

    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 5,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
  level: isDev ? 'debug' : 'info',
};
