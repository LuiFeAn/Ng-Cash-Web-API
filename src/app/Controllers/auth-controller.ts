import { Request, Response } from 'express';

import { AuthDTO } from '../dtos/auth-dto';

import authService from '../services/auth-service';

export class AuthController  {

    async authenticate(request: Request<{},{},AuthDTO>, response: Response){

        const { username, password } = request.body

        const authPayload = await authService.auth(username,password);

        response.json(authPayload);

    }


}

export default new AuthController();

