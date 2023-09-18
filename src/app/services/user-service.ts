import { Repository } from "typeorm";

import User from "../entities/User";

import AppErr from "../errors/AppErr";

import { AccountService } from "./account-service";

export class UserService {

    constructor(
        private readonly userRepository: Repository<User>,
        private readonly accountService: AccountService
    ){}

    async findOne(id: string){

        const user = await this.userRepository.findOneBy({
            id
        });

        if( !user ){

            throw new AppErr({
                statusCode:404,
                errors:[
                    'Usuário não encontrado'
                ]
            })

        }

        return user;

    }

    async create(username: string, password: string){

        const userInstance = this.userRepository.create({
            username,
            password
        });

        const user = await this.userRepository.save(userInstance);

        await this.accountService.create(user.id);
        

    }
    

}
