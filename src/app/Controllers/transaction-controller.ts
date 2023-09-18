import { Request, Response } from "express";

import { CreateTransactionDTO } from "../dtos/transaction-dto";

import { TransactionService } from "../services/transaction-service";

export class TransactionController {

    constructor(private readonly transactionService: TransactionService){}

    async show(request: Request, response:Response){

        const transactions = await this.transactionService.findOne(request.authUser.accountId);

        response.json(transactions);

    }

    async store(request: Request<{},{},CreateTransactionDTO>, response: Response){

        await this.transactionService.makeTransaction(request.authUser.id,request.body);

        response.sendStatus(200);

    }

}
