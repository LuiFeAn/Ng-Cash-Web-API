import { Request, Response } from "express";
import { Between } from "typeorm";

import TransactionBody from "../@types/transaction-body";

import User from "../repositories/user-repository";
import Account from "../repositories/account-repository";
import Transaction from "../repositories/transaction-repository";

import { CustomRequest } from "../middlewares/jwt-verification";
import TokenPayload from "../@types/token-payload";
import AppDataSource from "../database";

import TransactionQueryProps from "../@types/transaction-query";

class TransactionController {


    async show(request: Request, response: Response){

        const { date, debit, credit } = ( request.query as TransactionQueryProps );

        const { token } = ( request as CustomRequest );
        const { accountId } = (token as TokenPayload);

        const repository = AppDataSource.getRepository(Transaction);


        if(debit && !credit && date){
            repository.createQueryBuilder('')
            const transactions = await repository.find({where:{
                debitedAccountId:accountId,
                creditedAt: date
            }});
            return response.json(transactions);
        }

        if(credit && !debit && date){
            const transactions = await repository.find({where:{
                creditedAccountId:accountId,
                creditedAt: date
            }});
            return response.json(transactions);
        }

        if(debit && !credit && !date){
            const transactions = await repository.find({where:{
                debitedAccountId:accountId
            }});
            return response.json(transactions);
        }

        if(credit && !debit && !date){
            const transactions = await repository.find({where:{
                creditedAccountId:accountId
            }});
            return response.json(transactions);
        }

        if(date && !debit && !credit){
            const transactions = await repository.find({where:{
                creditedAt:date
            }});
            return response.json(transactions);
        }

        if(!date && !debit && !credit){
            const credited = await repository.find({where:{
                creditedAccountId:accountId
            }});
            const debited = await repository.find({where:{
                debitedAccountId:accountId
            }});

            const allTransactions = [...credited,...debited];
            return response.json(allTransactions);
        }


    }

    async create(request: Request, response: Response){

        const { token } = ( request as CustomRequest );
        const { accountId, username } = (token as TokenPayload);

        const { toUser, value } = (request.body as TransactionBody);

        const transactionErrors = [];

        if(!toUser) transactionErrors.push({
            reason:'O usuário para o qual receberá a transação não foi específicado'
        });

        if(!value) transactionErrors.push({
            reason:'O valor da transação não foi específicado'
        });

        if(transactionErrors.length > 0)
        return response.status(404).json( {error: transactionErrors} );

        const accountRepository = AppDataSource.getRepository(Account);
        const fromUserAccount = await accountRepository.findOne({where:{ id: accountId}});

        if(fromUserAccount?.balance && fromUserAccount.balance < value){
            return response.status(401).json({
                error: 'Você não possui saldo o suficiente para realizar essa transação'}
            );
        }

        if(username === toUser)
        return response.status(401).json( {
            error: 'Você não pode realizar uma transação para si mesmo'
        } );

        const userRepository = AppDataSource.getRepository(User);

        const toUserTransaction = await userRepository.findOne({ where: { username: toUser}});
        if(!toUserTransaction)
        return response.status(404).json({
             error: 'Não conseguimos encontrar este usuário'
        });

        accountRepository.update(fromUserAccount?.id as string, {
            balance:Number(fromUserAccount?.balance ? fromUserAccount.balance - value : null)
        });

        const toUserAccount = await accountRepository.findOne({ where: { id: toUserTransaction.accountId }});

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

        response.json(transaction);

    }

}

export default new TransactionController();
