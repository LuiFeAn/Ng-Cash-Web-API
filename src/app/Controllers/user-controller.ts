import { Request, Response } from "express";

import userService from "../services/user-service";

import AppErr from "../errors/AppErr";

class UserController  {


    async store(request: Request, response: Response){

        const { username, password } = request.body;

        const service = await userService.createNewUser({
            username,
            password
        });

        if( service instanceof AppErr){
            return response.status(service.statusCode).json({
                error: service.message
            });
        }

        response.json({
            sucess:'Usuário cadastrado com sucesso'
        });


    }

}

export default new UserController();
