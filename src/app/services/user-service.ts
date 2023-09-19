import ApiServiceError from "../errors/ApiServiceError"; 

import { userRepository } from "../repositories/user-repository";

import accountService from "./account-service";

export class UserService {

    async findOne(id: string){

        const user = await userRepository.findOneBy({
            id
        });

        if( !user ){

            throw new ApiServiceError({
                statusCode:404,
                errors:[
                    'Usuário não encontrado'
                ]
            })

        }

        return user;

    }

    async create(username: string, password: string){

        const userInstance = userRepository.create({
            username,
            password
        });

        const user = await userRepository.save(userInstance);

        await accountService.create(user.id);

        return user
        

    }
    

}

export default new UserService();
