
import { Request, Response } from "express";

import { CreateTransactionDTO, GetTransactionsDto } from "../dtos/transaction-dto";

import transactionService from "../services/transaction-service";

export class TransactionController {

    async index(request: Request, response: Response){

        const transactions = await transactionService.allTransactions(request.authUser.id,request.query as unknown as GetTransactionsDto);

    }

    async show(request: Request, response:Response){

        const transactions = transactionService.findOne(request.authUser.accountId);

        response.json(transactions);

    }

    async store(request: Request<{},{},CreateTransactionDTO>, response: Response){

        await transactionService.makeTransaction(request.authUser.id,request.body);

        response.sendStatus(200);

    }

}

export default new TransactionController();
