import { Request, Response } from "express";

import accountService from "../services/account-service";

class AccountController {

    async show(request: Request< { id: string }>, response: Response){

        const account = await accountService.findOne(request.authUser.id,request.params.id);

        response.json(account);

    }

}

export default new AccountController();