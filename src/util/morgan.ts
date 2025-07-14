import morgan, { StreamOptions } from 'morgan';
import { Request, Response } from 'express';
import Logger from './logger';

const stream: StreamOptions = {
  write: (message) => {
    const {
      method,
      url,
      status,
      contentLength,
      responseTime,
      requestId,
      caller,
      callStack,
      userId,
      adminId,
      adminEmail,
      userAgent,
      referer,
      realIp,
      tenant,
    } = JSON.parse(message);

    Logger.http(`${method} ${url} ${status} ${contentLength} - ${responseTime} ms`, {
      timestamp: new Date().toString(),
      method,
      url,
      status: Number(status),
      contentLength,
      responseTime: Number(responseTime),
      requestId,
      caller,
      callStack,
      userId,
      adminId,
      adminEmail,
      userAgent,
      referer,
      realIp,
      tenant,
    });
  },
};

morgan.token('ip', (req: Request) => {
  return req.ip?.replace(/^::ffff:/, '');
});

morgan.token('adminId', (req: Request, res: Response) => {
  return res.get('adminId');
});

morgan.token('adminEmail', (req: Request, res: Response) => {
  return res.get('adminEmail');
});

morgan.token('userId', (req: Request, res: Response) => {
  return res.get('userId');
});

morgan.token('tenant', (req: Request, res: Response) => {
  return res.get('tenant');
});

const morganMiddleware = morgan(
  (tokens, req, res) => {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      contentLength: tokens.res(req, res, 'content-length') || '-',
      responseTime: tokens['response-time'](req, res),
      requestId: tokens.res(req, res, 'x-request-id'),
      caller: tokens.req(req, res, 'x-caller'),
      callStack: tokens.req(req, res, 'x-call-stack'),
      userId: tokens.userId(req, res),
      adminId: tokens.adminId(req, res),
      adminEmail: tokens.adminEmail(req, res),
      userAgent: tokens['user-agent'](req, res),
      referer: tokens.req(req, res, 'referer'),
      realIp: tokens.ip(req, res),
      tenant: tokens.tenant(req, res),
    });
  },
  { stream },
);

export default morganMiddleware;
