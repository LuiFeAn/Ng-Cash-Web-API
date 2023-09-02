import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

import AppErr from '../errors/AppErr';

import dotenv from 'dotenv';

dotenv.config();

export function verifyJwt(request: Request, response: Response, next: NextFunction) {

    const token = request.header('Authorization')?.replace('Bearer','');

    if( !token ){

        throw new AppErr({
            statusCode:401,
            errors:[
                'Não autorizado'
            ]
        })

    }

    jwt.verify(token,process.env.JWT_SECRET, (err: any, decode: any) => {

        if(err) return response.status(401).json({
            error:'Token inválido'
        });

        request.authUser = decode;

        next();
        
    });

}

