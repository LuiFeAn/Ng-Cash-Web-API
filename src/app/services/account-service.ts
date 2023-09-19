import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

import ApiServiceError from "../errors/ApiServiceError";

import { accountRepository } from "../repositories/account-repository";

import Account from "../entities/Account";

import { FindOneOptions, FindOptionsWhere } from "typeorm";


export class AccountService {

    async create(userId: string){

        await accountRepository.save({
            user:{
                id: userId
            }
        })

    }

    async getCurrentUserAccount(userId: string, paramUserId: string){
        
        if( userId != paramUserId ){

            throw new ApiServiceError({
                statusCode:401,
                errors:[
                    'Acesso não autorizado. Você não possui permissão para acessar a conta de outros usuários.'
                ]
            })

        }

        const account = await this.getOne({
            where:{
                id: userId
            }
        });

        return account;

    }

    async getOne(params: FindOneOptions<Account>){

        const account = await accountRepository.findOne(params);

        if( !account ){

            throw new ApiServiceError({
                statusCode:401,
                errors:[
                    'Conta não existente'
                ]
            })

        }

        return account

    }

    async partialUpdate(id: string, accountDto: QueryDeepPartialEntity<Account>){

        await accountRepository.update(id,accountDto);

    }

}

export default new AccountService();