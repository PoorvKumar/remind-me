import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (token) {
    verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}
