import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const newUser = await this.authService.register(userData);
      return res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.authService.login(email, password);
      this.setTokenCookie(res, token);
      return res.json({ user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  public async checkAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.sendStatus(401);
      }

      const { user, token: newToken } =
        await this.authService.verifyAndRefreshToken(token);

      if (newToken) {
        this.setTokenCookie(res, newToken);
      }

      return res.status(200).json({ user });
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("token");
    return res.sendStatus(200);
  }

  public async integrateGoogle(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const url = await this.authService.getGoogleAuthUrl();
    return res.status(200).json({ url });
  }

  public async googleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.query;
      const { user, token } = await this.authService.googleCallback(
        code as string,
      );
      this.setTokenCookie(res, token);
      return res.redirect(`${process.env.FRONTEND_URL}/auth-success`);
    } catch (err) {
      res.redirect(
        `${process.env.FRONTEND_URL}/auth-failure?error=${encodeURIComponent(
          err.message,
        )}`,
      );
    }
  }

  private setTokenCookie(res: Response, token: string) {
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }
}
