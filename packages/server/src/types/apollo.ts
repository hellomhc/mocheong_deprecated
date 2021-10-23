import {Request, Response} from 'express';

// Apollo context
export interface Context {
  req: Request;
  res: Response;
}
