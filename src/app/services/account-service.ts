import AppDataSource from '../database/index';

import Account from '../models/Account';

class AccountService {

    async getAccountByTokenId(id: string){

        const repository = AppDataSource.getRepository(Account);
        return await repository.findOneBy({ id });

    }

}

export default new AccountService();
