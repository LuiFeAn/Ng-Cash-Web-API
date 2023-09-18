import { Request, Response } from 'express';

import { AuthService } from '../services/auth-service';

import { AuthDTO } from '../dtos/auth-dto';

export class AuthController  {

    constructor(private readonly authService: AuthService){}

    async authenticate(request: Request<{},{},AuthDTO>, response: Response){

        const { username, password } = request.body

        const authPayload = await this.authService.auth(username,password);

        response.json(authPayload);

    }


}

