import { Request, Response } from 'express';

import { AuthService } from '../services/auth-service';

export class AuthController  {

    constructor(private readonly authService: AuthService){}

    async authenticate(request: Request, response: Response){

        const authPayload = await this.authService.auth({...request.body});

        response.json(authPayload);

    }


}

