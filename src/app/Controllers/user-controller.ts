import { Request, Response } from "express";

import userService from "../services/user-service";

class UserController  {


    async store(request: Request, response: Response){

        const { username, password } = request.body;

        await userService.createNewUser({
            username,
            password
        });

        response.json({
            sucess:'Usuário cadastrado com sucesso'
        });


    }

}

export default new UserController();
