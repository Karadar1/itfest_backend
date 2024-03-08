import { Request, Response } from 'express';
import { HttpError } from 'http-errors';
import logger from '../utils/logger';

const errorHandler = (err: Error | HttpError, req: Request, res: Response) => {
  if ('status' in err && 'message' in err) {
    logger.error(`HTTP Error: ${err.status} - ${err.message}`);
    return res.status(err.status).send(err.message);
  }

  logger.error(`Internal Server Error: ${err.message}`);
  res.status(500).send('Internal Server Error');
};

export default errorHandler;
