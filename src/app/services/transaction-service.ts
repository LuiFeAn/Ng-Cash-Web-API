
import ApiServiceError from "../errors/api-service-error";

import { CreateTransactionDTO } from '../dtos/transaction-dto';

import { transactionRepository } from "../repositories/transaction-repository";

import accountService from "./account-service";

import { GetTransactionsDto } from "../dtos/transaction-dto";

export class TransactionService {

    async allTransactions(userId: string,getTransactionsDto: GetTransactionsDto){

        const { date, page, quanty, type } = getTransactionsDto;

        const whereTransactions = [];

        if( type === 'all' ){

            whereTransactions.push({
                debitedAccountId: userId
            });

            whereTransactions.push({
                creditedAccountId: userId
            });

        }

        if( type === 'credied' ){

            whereTransactions.push({
                creditedAccountId: userId
            });

        }

        if( type === 'debited' ){

            whereTransactions.push({
                debitedAccountId: userId
            });
            
        }

        const transactions = await transactionRepository.find({
            where: whereTransactions,
            take: quanty,
            skip: ( quanty * page) - page
        });

        return transactions;

    }

    async findOne(transactionId: string){

        const transaciton = await transactionRepository.findOneBy({
            id: transactionId
        });

        return transaciton;

    }

    async makeTransaction(debitedAccountId: string,transactionDto: CreateTransactionDTO){

        const fromUserAccount = await accountService.getOne({
            where:{
                user:{
                    id: debitedAccountId
                }
            }
        });

        const toUserAccount = await accountService.getOne({
            where:{
                user:{
                    username: transactionDto.credited_account_nickname
                }
            },
            relations:{
                user:true,
            }
        });


        const transactionErr: string [] = [];

        const addTransactionError = ( error: string ) => transactionErr.push(error);

        if( debitedAccountId === toUserAccount.user.id ){

            addTransactionError('Você não pode realizar uma transação para si mesmo');

        }

        if( fromUserAccount.balance < transactionDto.value ){

            addTransactionError('Você não possui saldo o suficiente para efetuar essa transação');

        }

        if( transactionErr.length > 0 ){

            throw new ApiServiceError({
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

