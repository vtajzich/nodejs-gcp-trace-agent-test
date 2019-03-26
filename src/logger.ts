import winston from 'winston';

const {LoggingWinston} = require('@google-cloud/logging-winston');
const loggerOptions = {
    prefix: 'logging_tracing_test',
    serviceContext: {SERVICE_NAME: 'logging_tracing_test'},
    projectId: process.env.LOGGING_PROJECT_ID,
    keyFilename: process.env.SA_LOGGING_FILE
};

const format = winston.format.printf(info => {
    let message = `[${info.level}] ${info.message}`;
    if (info.meta) {
        message += ` ${JSON.stringify(info.meta)}`;
    }
    return message;
});

const {colorize, splat} = winston.format;

const winstonConsole = new winston.transports.Console({
    level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    format: winston.format.combine(splat(), colorize(), format),
});

const transports = [winstonConsole, new LoggingWinston(loggerOptions)];

export const logger = winston.createLogger({
    transports,
});
