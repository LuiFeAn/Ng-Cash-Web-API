import { Request, Response } from "express";

import { UserService } from "../services/user-service";

import { CreateUserDTO } from "../dtos/user-dto";

export class UserController  {

    constructor(private readonly userService: UserService){}

    async store(request: Request<{},{},CreateUserDTO>, response: Response){

        const { username, password } = request.body;

        await this.userService.create(username,password);

        response.sendStatus(200);

    }

}

