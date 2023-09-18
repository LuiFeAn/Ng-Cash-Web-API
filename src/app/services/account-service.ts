import AppErr from "../errors/AppErr";

import { accountRepository } from "../repositories/account-repository";

export class AccountService {

    async create(userId: string){

        await accountRepository.save({
            user:{
                accountId: userId
            }
        })

    }

    async findOne(id: string){

        const account = await accountRepository.findOneBy({
            id
        });

        if( !account ){

            throw new AppErr({
                statusCode:401,
                errors:[
                    'Conta não existente'
                ]
            })

        }

        return account!

    }

    async partialUpdate(id: string, accountDto: any){

        await accountRepository.update(id,accountDto);

    }

}

export default new AccountService();