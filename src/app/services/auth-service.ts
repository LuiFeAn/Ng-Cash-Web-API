import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import ApiServiceError from "../errors/ApiServiceError";

import { userRepository } from '../repositories/user-repository';

export class AuthService {

    async auth(username: string, password: string){

        const user = await userRepository.findOneBy({
            username
        });

        const validPassword = user ? await bcrypt.compare(password, user.password) : undefined;

        if(!validPassword){

            throw new ApiServiceError({
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

export default new AuthService();