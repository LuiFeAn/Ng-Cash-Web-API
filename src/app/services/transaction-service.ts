import AppDataSource from "../database";

import Transaction from "../repositories/transaction-repository";
import User from "../repositories/user-repository";
import Account from "../repositories/account-repository";
import AppErr from "../errors/AppErr";

type TransactionProps = {

    toUser: string;
    value: number;
    username: string;
    accountId: string;
}

class TransactionService {

    async getTransactionsByTokenId(id: string): Promise< Transaction[] >{

        const repository = AppDataSource.getRepository(Transaction);
        return await repository.findBy({ id });

    }

    async makeTransaction({toUser, value, accountId, username}: TransactionProps): Promise< AppErr | void >{

        const accountRepository = AppDataSource.getRepository(Account);

        const fromUserAccount = await accountRepository.findOneBy({
            id: accountId
        });

        if(fromUserAccount?.balance && fromUserAccount.balance < value){
            throw new AppErr({
                statusCode:401,
                error:'Você não possui saldo o suficiente para realizar essa transação'
            });
        }

        if(username === toUser){
            throw new AppErr({
                statusCode:401,
                error:'Você não pode realizar uma transação para si mesmo'
            })
        }

        const userRepository = AppDataSource.getRepository(User);

        const toUserTransaction = await userRepository.findOneBy({
            username: toUser
        });

        if(!toUserTransaction){
            throw new AppErr({
                statusCode:401,
                error:'Não conseguimos encontrar este usuário'
            })
        }

        accountRepository.update(fromUserAccount?.id as string, {
            balance:Number(fromUserAccount?.balance ? fromUserAccount.balance - value : null)
        });

        const toUserAccount = await accountRepository.findOneBy({
            id: toUserTransaction.accountId
        });

        accountRepository.update(toUserAccount?.id as string,{
            balance:Number(toUserAccount?.balance ? toUserAccount.balance + value : null)
        })

        const transactionRepository = AppDataSource.getRepository(Transaction);
        const transaction = transactionRepository.create({
            debitedAccountId:fromUserAccount?.id,
            creditedAccountId:toUserAccount?.id,
            value
        });

        transactionRepository.save(transaction);

    }

}

export default new TransactionService();
