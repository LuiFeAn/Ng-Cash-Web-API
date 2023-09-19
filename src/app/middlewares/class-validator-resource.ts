import { plainToInstance } from 'class-transformer'

import { validate } from 'class-validator';

import { NextFunction, Request, Response } from 'express';

export default function classValidatorResource<T extends new (...args: any[]) => any>(resource: T, param: 'body' | 'query' | 'params'){

    return async function(req: Request, res: Response, next: NextFunction){

        const resourceDto = plainToInstance(resource,req[param]);

        const errors = await validate(resourceDto);

        if( errors.length > 0 ){

            return console.log(errors);

        }

        req[param] = resourceDto;

        next();

    }

}