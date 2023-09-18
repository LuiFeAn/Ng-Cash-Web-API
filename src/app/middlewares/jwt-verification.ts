import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

import AppErr from '../errors/AppErr';

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

    jwt.verify(token,process.env.JWT_SECRET, (err: any, decode: TokenPayload) => {

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

