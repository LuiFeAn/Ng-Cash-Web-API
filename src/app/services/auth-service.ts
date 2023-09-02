import { Repository } from "typeorm";

import User from "../entities/User";

import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import AppErr from "../errors/AppErr";

class IAuthenticate{

    username: string

    password: string

}

export class AuthService{

    constructor(private readonly userRepository: Repository<User>){}

    async auth({
        username,
        password
    }: IAuthenticate){

        const user = await this.userRepository.findOne({
            where:{
                username
            },
            relations:{
                account:true
            }
        });

        const validPassword = user ? await bcrypt.compare(password, user.password) : undefined;

        if(!validPassword){

            throw new AppErr({
                statusCode:400,
                errors:[
                    'Email ou senha incorreto(s)'
                ]
            });
            
        }

        const token = jwt.sign(
        {
            id: user.id,
            username:user.username,
            accountId: user.accountId
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'1d'
        });

        return {
            user,
            token
        }

    }

}