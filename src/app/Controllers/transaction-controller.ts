import { Request, Response } from "express";

import transactionService from "../services/transaction-service";

import { CustomRequest } from "../middlewares/jwt-verification";
import TokenPayload from "../@types/token-payload";
import AppErr from "../errors/AppErr";


class TransactionController {


    async session(request: Request, response: Response){


        const { token } =  request as CustomRequest;
        const { accountId } = token as TokenPayload;

        const service = await transactionService.getTransactionsByTokenId(accountId);

        response.json(service);


    }

    async store(request: Request, response: Response){

        const { token } = request as CustomRequest;
        const { accountId, username } = token as TokenPayload;

        const { toUser, value } = request.body;

        const service = await transactionService.makeTransaction({
            accountId,
            username,
            toUser,
            value
        });

        if( service instanceof AppErr ){

            const { statusCode, message } = service;
            return response.status((statusCode)).json({
                error: message
            })
        }

        response.sendStatus(200);

    }

}

export default new TransactionController();
