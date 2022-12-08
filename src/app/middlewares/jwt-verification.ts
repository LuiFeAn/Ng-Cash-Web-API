import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export interface CustomRequest extends Request {
    token: string | JwtPayload
};

export function verifyJwt(request: Request, response: Response, next: NextFunction) {

    const token = request.header('Authorization')?.replace('Bearer','');

    if(!token) return response.status(401).json( {
        error: 'Não autorizado'
    });

    jwt.verify(token,process.env.JWT_SECRET, (err: any, decode: any) => {
        if(err) return response.status(401).json({
            error:'Token inválido'
        });

        (request as CustomRequest).token = decode;
        next();
    });

}

