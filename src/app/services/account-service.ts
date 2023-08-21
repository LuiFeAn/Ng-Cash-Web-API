import { accountRepository } from "../repositories/account-repository";

class AccountService {

    async getAccountByTokenId(id: string){

        return accountRepository.findOneBy({ id });

    }

}

export default new AccountService();
