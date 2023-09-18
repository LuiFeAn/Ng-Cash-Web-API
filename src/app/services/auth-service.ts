import { Repository } from "typeorm";

import User from "../entities/User";

import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import AppErr from "../errors/AppErr";

export class AuthService{

    constructor(private readonly userRepository: Repository<User>){}

    async auth(username: string, password: string){

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
                statusCode:401,
                errors:[
                    'Email ou senha incorreto(s)'
                ]
            });
            
        }

        if( user ){
    
            const token = jwt.sign(
            {
                id: user.id,
                username:user.username,
                accountId: user.accountId
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn:'1d'
            });
    
            return {
                user,
                token
            }

        }

    }

}