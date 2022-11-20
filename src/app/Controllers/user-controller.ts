import { Request, Response } from "express";
import AppDataSource from "../database";


import hasUpper from "../utils/has-upper";
import hasNumber from "../utils/has-number";

import User from "../repositories/user-repository";

class UserController  {


    async store(request: Request, response: Response){

        const { username, password } = request.body;

        const repository = AppDataSource.getRepository(User);

        if(!username || username.length < 3)
        return response.status(404).json({
            error: 'Seu nome deve possuir ao menos 3 (três) caracteres !'
        });

        const passwordErrorsFound = [];

        if(!password || password.length < 8) passwordErrorsFound.push({
            reason:'Sua senha deve possuir, no mínimo, 8 (oito) caracteres'
        });

        const verifyIfHasUpper = hasUpper(password);
        if(!verifyIfHasUpper) passwordErrorsFound.push({
            reason:'Sua senha deve possuir uma letra maiúscula'
        });

        const verifyIfHasNumber = hasNumber(password);
        if(!verifyIfHasNumber) passwordErrorsFound.push({
            reason:'Sua senha deve possuir um número'
        });

        if(passwordErrorsFound.length > 0)
        return response.status(404).json({
            error: passwordErrorsFound
        });

        const userExists = await repository.findOne({ where: {
            username:username.trim()}
        });

        if(userExists)
        return response.status(409).json({
             error: 'Nome de usuário já existente '
        });

        const user = repository.create({ username, password});
        await repository.save(user);


        response.status(200).json({ sucess: 'Usuário criado com sucesso !'});

    }

}

export default new UserController();
