import { Request, Response } from "express";

import userService from "../services/user-service";

class UserController  {


    async store(request: Request, response: Response){

        const { username, password } = request.body;

        await userService.createNewUser({
            username,
            password
        });

        response.sendStatus(200);

    }

}

export default new UserController();
