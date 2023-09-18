import { IsNotEmpty, IsUUID } from "class-validator";

import { Transform, TransformFnParams } from "class-transformer";

export class CreateTransactionDTO {

    @IsNotEmpty({
        message:'Informe o ID do usuário a qual a transferência será realizada é obrigatório'
    })
    @IsUUID(undefined,{
        message:'Informe um UUID válido'
    })
    @Transform( (params: TransformFnParams ) => params.value.trim() )
    readonly credited_account_id: string
    
    @IsNotEmpty({
        message:'Informe o valor da transação a ser feita'
    })
    readonly value: number

}

