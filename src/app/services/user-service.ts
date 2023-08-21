import AppDataSource from "../database";

import User from "../entities/User";
import AppErr from "../errors/AppErr";

type UserProps = {

    username: string;
    password: string;

}

class UserService {


    async createNewUser({username,password}: UserProps): Promise< AppErr | void>{

        const repository = AppDataSource.getRepository(User);

        const userExists = await repository.findBy({
            username
        });

        if(userExists) throw new AppErr({
            statusCode:401,
            error:'Nome de usuário já existente'
        })

        const user = repository.create({
            username,
            password
        });

        await repository.save(user);
    }

}

export default new UserService();
