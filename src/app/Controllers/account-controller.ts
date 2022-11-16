import { Request, Response } from "express";

import { CustomRequest } from "../middlewares/jwt-verification";
import TokenPayload from "../@types/token-payload";

import Account from "../models/Account";
import AppDataSource from "../database";

class AccountController {

    async show(request:Request, response: Response){

        //Extrai o token decodado salvo na request enviado pelo middleware Jwt
        const { token } = (request as CustomRequest);
        //Extrai o id da conta do token
        const { accountId } = (token as TokenPayload);

        //Obtém a instância do repositório Account
        const repository = AppDataSource.getRepository(Account);
        //Busca a conta pelo Id fornecido no payload do Jwt
        const userAccount = await repository.findOne({ where: { id: accountId}});

        response.json(userAccount);

    }

}

export default new AccountController();
