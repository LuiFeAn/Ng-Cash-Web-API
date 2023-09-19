import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { Transform, TransformFnParams } from 'class-transformer';

export class AuthDTO {

    @IsNotEmpty({
        message:'Informe seu nome de usuário'
    })
    @IsString({
        message:'Informe uma string'
    })
    @Transform( (params: TransformFnParams) => params.value.trim() )
    readonly username: string

    @IsNotEmpty({
        message:'Informe sua senha'
    })
    @Transform( (params: TransformFnParams) => params.value.trim() )
    @IsString({
        message:'Informe uma string'
    })
    readonly password: string

}