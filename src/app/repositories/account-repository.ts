import AppDataSource from "../database";

import Account from "../entities/Account";

export const accountRepository = AppDataSource.getRepository(Account);