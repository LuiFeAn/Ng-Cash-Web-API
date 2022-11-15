import jwt, { Secret, JwtPayload} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/api-error';
import dotenv from 'dotenv';

dotenv.config();

export interface CustomRequest extends Request {
    token: string | JwtPayload
};

export function verifyJwt(request: Request, response: Response, next: NextFunction) {

    try{

        const token = request.header('Authorization')?.replace('Bearer','');

        if(!token) throw new ApiError({errorMessage:' Not Found ',errorStatus:404});

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

        (request as CustomRequest).token = decodedToken;

        next();

    }catch( err ){

        const throwedError = ( err as ApiError );
        const { status, message } = throwedError;

        response.status(status).json({ error: message });

    }

}

