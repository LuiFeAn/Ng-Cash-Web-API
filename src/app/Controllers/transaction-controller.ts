import { Request, Response } from "express";

import transactionService from "../services/transaction-service";

import TokenPayload from "../@types/token-payload";

class TransactionController {

    async index(request: Request, response:Response){

        const transactions = await transactionService.getTransactionsByTokenId(request.authUser.accountId);

        response.json(transactions);

    }

    async store(request: Request, response: Response){

        const { accountId, username } = request.authUser;

        const { toUser, value } = request.body;

        await transactionService.makeTransaction({
            accountId,
            username,
            toUser,
            value
        });

        response.sendStatus(200);

    }

}

export default new TransactionController();
