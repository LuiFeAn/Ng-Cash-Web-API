import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import AppDataSource from '../database';
import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import User from '../repositories/user-repository';

class AuthController  {

    async authenticate(request: Request, response: Response){

        const { username, password } = request.body;
        const repository = AppDataSource.getRepository(User);

        const user = await repository.findOne({ where: { username }});

        const validPassword = user ? await bcrypt.compare(password, user.password) : undefined;
        if(!validPassword) return response.status(401).json( {
            error: 'Email ou senha inválido(s)'
        });

        const token = jwt.sign({
            id: user.id,
            username:user.username,
            accountId: user.accountId
        },process.env.JWT_SECRET,{
            expiresIn:'1d'
        });

        return response.status(200).json({user,token});

    }


}

export default new AuthController();
