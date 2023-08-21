import { transactionRepository } from '../repositories/transaction-repository';
import { userRepository } from '../repositories/user-repository';
import { accountRepository } from '../repositories/account-repository';
import { IMakeTransaction } from '../interfaces/ITransactions';
import AppErr from "../errors/AppErr";


class TransactionService {

    async getTransactionsByTokenId(id: string){

        return transactionRepository.find({
            where:[
                {
                    debitedAccountId: id,
                },
                {
                    creditedAccountId: id,
                }
            ]

        });

    }

    async makeTransaction({toUser, value, accountId, username}: IMakeTransaction){

        const fromUserAccount = await accountRepository.findOneBy({
            id: accountId
        });

        if(fromUserAccount.balance && fromUserAccount.balance < value){
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

        const toUserTransaction = await userRepository.findOneBy({
            username: toUser
        });

        if(!toUserTransaction){
            throw new AppErr({
                statusCode:401,
                error:'Não conseguimos encontrar este usuário'
            })
        }

        accountRepository.update(fromUserAccount.id, {
            balance:Number(fromUserAccount.balance - value),
        });

        const toUserAccount = await accountRepository.findOneBy({
            id: toUserTransaction.accountId
        });

        accountRepository.update(toUserAccount.id,{
            balance:Number(toUserAccount.balance + value),
        });

        const transaction = transactionRepository.create({
            debitedAccountId:fromUserAccount.id,
            creditedAccountId:toUserAccount.id,
            value
        });

        transactionRepository.save(transaction);


    }

}

export default new TransactionService();
