import winston, { format, createLogger } from 'winston';

const { combine, timestamp, label, json } = format;

const levels: {} = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const env = process.env.NODE_ENV || 'development';
const isDevelopment = env === 'development';

const level = (): string => {
  return isDevelopment ? 'debug' : 'http';
};

const timestampFormat = isDevelopment
  ? timestamp({ format: 'YYYY-MM-DDTHH:mm:ss:msZ' })
  : timestamp({ format: () => Date.now().valueOf().toString() });

const Logger = createLogger({
  level: level(),
  levels,
  format: combine(timestampFormat, format.errors({ stack: true }), json(), label()),
  transports: [new winston.transports.Console()],
});

export default Logger;
