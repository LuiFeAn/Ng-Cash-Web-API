import { Repository } from "typeorm";

import User from "../entities/User";

interface IUserInsert {

    username: string;

    password: string;

}

export class UserService {

    constructor(private readonly userRepository: Repository<User>){}

    async create({username,password}: IUserInsert){

        const user = this.userRepository.create({
            username,
            password
        });

        await this.userRepository.save(user);

    }
    

}
