import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

import AppErr from '../errors/ApiServiceError';

import dotenv from 'dotenv';

import { TokenPayload } from '../interfaces/token-payload';

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

    jwt.verify(token,process.env.JWT_SECRET as string, (err: any, decode: any) => {

        if(err){

            throw new AppErr({
                statusCode:401,
                errors:[
                    'Não autorizado'
                ]
            })

        }

        request.authUser = decode;

        next();
        
    });

}

