import AppErr from "../errors/AppErr";

import { CreateTransactionDTO } from '../dtos/transaction-dto';

import { Repository } from 'typeorm';

import Transaction from '../entities/Transaction';

import { AccountService } from './account-service';

export class TransactionService {

    constructor(
        private readonly transactionRepository: Repository<Transaction>,
        private readonly accountService: AccountService
    ){}

    async findOne(id: string){

        return this.transactionRepository.find({
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

        const fromUserAccount = await this.accountService.findOne(debitedAccountId);

        const toUserAccount = await this.accountService.findOne(transactionDto.credited_account_id);

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

        await this.accountService.partialUpdate(fromUserAccount.id, {
            balance: fromUserAccount.balance - transactionDto.value,
        });

        await this.accountService.partialUpdate(toUserAccount.id,{
            balance: toUserAccount.balance + transactionDto.value,
        });

        const transactionInstance = this.transactionRepository.create({
            debitedAccountId:fromUserAccount.id,
            creditedAccountId:toUserAccount.id,
            value: transactionDto.value
        });

        this.transactionRepository.save(transactionInstance);


    }

}

