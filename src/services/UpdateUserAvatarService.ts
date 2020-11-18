import path from "path";
import { getRepository } from "typeorm";
import User from "../models/User";
import fs from "fs";

import uploadConfig from "../config/upload";

interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new Error("Only authenticated user can change avatar");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = fs.existsSync(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default UpdateUserAvatarService;
