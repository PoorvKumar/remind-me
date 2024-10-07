import { getRepository, Repository } from "typeorm";
import { User } from "../entity/User";
import { compare, hash } from "bcryptjs";
import { decode, sign, verify } from "jsonwebtoken";
import axios from "axios";
import { AppDataSource } from "../config/data-source";

export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async register(userData: Partial<User>): Promise<User> {
    if (!userData.email || !userData.password) {
      throw new Error("Email and password are required");
    }

    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await hash(userData.password!, 10);
    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = this.generateToken(user);
    return { user, token };
  }

  async verifyAndRefreshToken(
    token: string,
  ): Promise<{ user: User; token?: string }> {
    try {
      const decoded: any = decode(token);
      if (!decoded) throw new Error("Invalid token");

      const payload: any = verify(token, process.env.JWT_SECRET!);
      const user = await this.userRepository.findOneOrFail({
        where: { id: payload.id },
      });

      if (!user) throw new Error("User not found");

      const timeTillExpire = decoded.exp - Math.floor(Date.now() / 1000);
      let newToken;
      if (timeTillExpire < 5 * 60) {
        newToken = this.generateToken(user);
      }

      return { user, token: newToken };
    } catch (err) {
      throw new Error("Invalid token");
    }
  }

  async getGoogleAuthUrl() {
    const url = "https://accounts.google.com/o/oauth2/v2/auth?";
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.APP_URL}/api/auth/google/callback`,
      response_type: "code",
      scope: "email profile",
    });

    return url + params.toString();
  }

  async googleCallback(code: string) {
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.APP_URL}/api/auth/google/callback`,
        code,
        grant_type: "authorization_code",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const { access_token } = tokenResponse.data;
    const userInfo = await this.getUserInfo(access_token);

    let user = await this.userRepository.findOne({
      where: { email: userInfo.email },
    });

    if (!user) {
      console.log(userInfo);

      user = await this.userRepository.save({
        email: userInfo.email,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        password: userInfo.id,
        profilePicture: userInfo.picture,
      });

      console.log("user", user);
    }

    const token = this.generateToken(user);
    return { user, token };
  }

  async getUserInfo(access_token: string) {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    return response.data;
  }

  private generateToken(user: User): string {
    return sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
  }
}
