import { Request, Response } from "express";
import AppDataSource from "../database";


import hasUpper from "../utils/has-upper";
import hasNumber from "../utils/has-number";

import User from "../models/User";

class UserController  {


    async store(request: Request, response: Response){

        const { username, password } = request.body;

        // Obtém o repositório de Usuário e Conta
        const repository = AppDataSource.getRepository(User);

        //Verifica se o nome enviado pelo Client possui, no mínimo, três caracteres
        if(username.length < 3)
        return response.status(404).json({ error: 'Seu nome deve possuir ao menos 3 (três) caracteres !'});

        const passwordErrorsFound = [];

        //Verifica se o password enviado pelo Client possui, no mínimo, 8 caracteres
        if(password.length < 8) passwordErrorsFound.push({
            reason:'Sua senha deve possuir, no mínimo, 8 caracteres'
        });

        //Verifica se o password enviado pelo Client possui uma letra maiúscula
        const verifyIfHasUpper = hasUpper(password);
        if(!verifyIfHasUpper) passwordErrorsFound.push({
            reason:'Sua senha deve possuir uma letra maiúscula'
        });

        //Verifica se o password enviado pelo client possui uma número
        const verifyIfHasNumber = hasNumber(password);
        if(!verifyIfHasNumber) passwordErrorsFound.push({
            reason:'Sua senha deve possuir um número'
        });

        if(passwordErrorsFound.length > 0)
        return response.status(404).json({ error: passwordErrorsFound });

        // Verifica se o nome de usuário já existe ou não no BD
        const userExists = await repository.findOne({ where: { username }});
        if(userExists)
        return response.status(409).json({ error: 'Nome de usuário já existente '});

        //Cria um novo usuário e armazena o retorno do registro
        const user = repository.create({ username, password});
        await repository.save(user);


        response.status(200).json({ sucess: 'Usuário criado com sucesso !'});

    }

}

export default new UserController();
