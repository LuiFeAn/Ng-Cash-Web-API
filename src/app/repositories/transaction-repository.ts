import AppDataSource from "../database";

import Transaction from "../entities/Transaction";

export const transactionRepository = AppDataSource.getRepository(Transaction);