
import AppErr from "../errors/AppErr";

import { CreateTransactionDTO } from '../dtos/transaction-dto';

import { transactionRepository } from "../repositories/transaction-repository";

import accountService from "./account-service";

export class TransactionService {

    async allTransactions(userId: string){

        const transactions = await transactionRepository.findBy({
            id: userId
        });

    }

    async findOne(id: string){

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

    async makeTransaction(debitedAccountId: string,transactionDto: CreateTransactionDTO){

        const fromUserAccount = await accountService.getOne(debitedAccountId);

        const toUserAccount = await accountService.getOne(transactionDto.credited_account_id);

        const transactionErr: string [] = [];

        const addTransactionError = ( error: string ) => transactionErr.push(error);

        if( fromUserAccount.balance < transactionDto.value ){

            addTransactionError('Você não possui saldo o suficiente para efetuar essa transação');

        }

        if( transactionDto.credited_account_id === debitedAccountId ){

            addTransactionError('Você não pode realizar uma transação para si mesmo');

        }

        if( transactionErr.length > 0 ){

            throw new AppErr({
                statusCode:401,
                errors: transactionErr
            })

        }

        await accountService.partialUpdate(fromUserAccount.id, {
            balance: fromUserAccount.balance - transactionDto.value,
        });

        await accountService.partialUpdate(toUserAccount.id,{
            balance: toUserAccount.balance + transactionDto.value,
        });

        const transactionInstance = transactionRepository.create({
            debitedAccountId:fromUserAccount.id,
            creditedAccountId:toUserAccount.id,
            value: transactionDto.value
        });

        transactionRepository.save(transactionInstance);


    }

}

export default new TransactionService();

