import AppDataSource from '../database/index';

import Account from '../repositories/account-repository';

class AccountService {

    async getAccountByTokenId(id: string){

        const repository = AppDataSource.getRepository(Account);
        return await repository.findOneBy({ id });

    }

}

export default new AccountService();
