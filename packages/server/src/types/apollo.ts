import {Request, Response} from 'express';
import {PrismaClient} from '.prisma/client';

// Apollo context
export interface Context {
  req: Request;
  res: Response;
  prisma: PrismaClient;
}
