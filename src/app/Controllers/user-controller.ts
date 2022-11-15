import { Request, Response } from "express";

class UserController {

    show(request: Request, response: Response){
        response.send('<h1>Pegou um usuário</h1>');
    }

    create(request: Request, response: Response){

    }

}

export default new UserController();
