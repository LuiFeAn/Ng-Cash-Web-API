import { Repository } from "typeorm";

import Account from "../entities/Account";

import AppErr from "../errors/AppErr";

export class AccountService {

    constructor(private readonly accountRepository: Repository<Account>){}

    async create(userId: string){

        await this.accountRepository.save({
            user:{
                accountId: userId
            }
        })

    }

    async findOne(id: string){

        const account = await this.accountRepository.findOneBy({
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

        await this.accountRepository.update(id,accountDto);

    }

}