import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;

  if (token) {
    verify(token, process.env.JWT_SECRET!, async (err: any, payload: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: payload.id },
      });

      if (!user) {
        return res.sendStatus(401);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}
