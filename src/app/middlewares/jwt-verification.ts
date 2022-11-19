import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export interface CustomRequest extends Request {
    token: string | JwtPayload
};

export function verifyJwt(request: Request, response: Response, next: NextFunction) {

    const token = request.header('Authorization')?.replace('Bearer','');

    if(!token) return response.status(401).json( { error: 'Não autorizado'});

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET);

    (request as CustomRequest).token = decodedToken;

    next();

}

