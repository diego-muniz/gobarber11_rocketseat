import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import User from "../models/User";
import auth from "../config/auth";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class SessionUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("Incorrect email/password combine");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect email/password combine");
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default SessionUserService;
