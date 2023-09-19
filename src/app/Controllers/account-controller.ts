import { Request, Response } from "express";

import accountService from "../services/account-service";

class AccountController {

    async show(request: Request, response: Response){

        const account = await accountService.findOne(request.authUser.id);

        response.json(account);

    }

}

export default new AccountController();