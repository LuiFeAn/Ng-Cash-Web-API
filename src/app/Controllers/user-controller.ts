import { Request, Response } from "express";

import { CreateUserDTO } from "../dtos/user-dto";

import userService from "../services/user-service";

export class UserController  {

    async store(request: Request<{},{},CreateUserDTO>, response: Response){

        const { username, password } = request.body;

        await userService.create(username,password);

        response.sendStatus(200);

    }

}

export default new UserController();

