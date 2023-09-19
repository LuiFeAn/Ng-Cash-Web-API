import AppErr from "../errors/AppErr";

import { accountRepository } from "../repositories/account-repository";

interface Test {

    loggedUserId?: string
    userParamId: string
    currentUserAccount?: boolean

}

export class AccountService {

    async create(userId: string){

        await accountRepository.save({
            user:{
                accountId: userId
            }
        })

    }

    async getCurrentUserAccount(userId: string, paramUserId: string){
        
        if( userId != paramUserId ){

            throw new AppErr({
                statusCode:401,
                errors:[
                    'Acesso não autorizado. Você não possui permissão para acessar a conta de outros usuários.'
                ]
            })

        }

        const account = await this.getOne(paramUserId);

        return account;

    }

    async getOne(userId: string){

        const account = await accountRepository.findOneBy({
            id: userId
        });

        if( !account ){

            throw new AppErr({
                statusCode:401,
                errors:[
                    'Conta não existente'
                ]
            })

        }

        return account

    }

    async partialUpdate(id: string, accountDto: any){

        await accountRepository.update(id,accountDto);

    }

}

export default new AccountService();