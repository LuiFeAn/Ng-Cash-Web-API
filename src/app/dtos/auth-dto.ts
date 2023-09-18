import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { Transform, TransformFnParams } from 'class-transformer';

export class AuthDTO {

    @IsNotEmpty({
        message:'Informe seu nome de usuário'
    })
    @IsString({
        message:'Informe uma string'
    })
    @MaxLength(150,{
        message:'Seu nome de usuário deve possuir no máximo 150 caracteres'
    })
    readonly username: string

    @IsNotEmpty({
        message:'Informe sua senha'
    })
    @IsString({
        message:'Informe uma string'
    })
    @MaxLength(150,{
        message:'Sua senha deve possuir no máximo 150 caracteres'
    })
    readonly password: string

}