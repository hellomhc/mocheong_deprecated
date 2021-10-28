import bcrypt from 'bcrypt';
import {Response} from 'express';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string) => {
  // The hashing done by bcrypt is CPU intensive, so the sync version will block the event loop
  // and prevent your application from servicing any other inbound requests or events.
  // The async version uses a thread pool which does not block the main event loop.
  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS));
  return await bcrypt.hash(password, salt);
};

export const signAccessToken = (username: string) => {
  return jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '30m',
  });
};

export const signRefreshToken = (username: string, tokenVersion: number) => {
  return jwt.sign(
    {username, tokenVersion},
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '7d',
    },
  );
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    path: '/refresh_token',
  });
};
