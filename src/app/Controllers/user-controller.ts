import { Request, Response } from "express";

import { UserService } from "../services/user-service";

export class UserController  {

    constructor(private readonly userService: UserService){}

    async store(request: Request, response: Response){

        await this.userService.create({...request.body});

        response.sendStatus(200);

    }

}

