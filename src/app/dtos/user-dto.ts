import { IsNotEmpty, MaxLength, IsString, MinLength } from 'class-validator';

import { HasUpperCase } from '../validators/has-upper-';

import { HasNumber } from '../validators/has-number';

import { Transform, TransformFnParams } from 'class-transformer'

export class CreateUserDTO {

    @IsNotEmpty({
        message:'Informe o nome de usuário'
    })
    @IsString({
        message:'Informe uma string'
    })
    @Transform( ( params: TransformFnParams) => params.value.trim())
    @MinLength(3,{
        message:'Seu nome deve possuir no mínimo 3 caracteres'
    })
    @MaxLength(150,{
        message:'Seu nome deve possuir no máximo 150 caracteres'
    })
    readonly username: string

    @IsNotEmpty({
        message:'Informe a senha'
    })
    @IsString({
        message:'Informe uma string'
    })
    @Transform( ( params: TransformFnParams) => params.value.trim())
    @MinLength(8,{
        message:'Sua senha deve possuir no mínimo 8 caracteres'
    })
    @HasUpperCase({
        message:'Sua senha deve possuir no mínimo uma letra maiúscula'
    })
    @HasNumber({
        message:'Sua senha deve possuir no mínimo um número'
    })
    readonly password: string

}



