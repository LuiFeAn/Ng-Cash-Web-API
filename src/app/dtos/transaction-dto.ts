import { IsNotEmpty, IsString, IsUUID,  IsISO8601, IsIn } from "class-validator";

import { Transform, TransformFnParams } from "class-transformer";

import { toNumber } from "../utils/to-number";

export class CreateTransactionDTO {

    @IsNotEmpty({
        message:'Informe o nome do usuário a qual a transferência será realizada'
    })
    @Transform( (params: TransformFnParams ) => params.value.trim() )
    readonly credited_account_nickname: string
    
    @IsNotEmpty({
        message:'Informe o valor da transação a ser feita'
    })
    readonly value: number

}

export class GetTransactionsDto {

    @IsNotEmpty({
        message:'Informe a página atual de transações'
    })
    @Transform( (params: TransformFnParams ) => toNumber(params.value) )
    readonly page: number

    @IsNotEmpty({
        message:'Informe a quantidade de registros que deseja obter'
    })
    @Transform( (params: TransformFnParams ) => toNumber(params.value) )
    readonly quanty: number

    @IsNotEmpty({
        message:'Informe o tipo de transação que deseja obter'
    })
    @IsString({
        message:'Informe uma string'
    })
    @IsIn(['all','debited','credited'],{
        message:'Tipo de transação inválido'
    })
    readonly type: string

    @IsISO8601(undefined,{
        message:'Informe uma data válida'
    })
    date: string



}