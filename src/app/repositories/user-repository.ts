import AppDataSource from "../database";

import User from "../entities/User";

export const userRepository = AppDataSource.getRepository(User);
