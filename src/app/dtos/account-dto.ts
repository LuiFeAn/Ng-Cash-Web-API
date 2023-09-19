import { IsNotEmpty, IsUUID } from 'class-validator';

export class AccountIdParamDto {

    @IsNotEmpty({
        message:'Informe o ID de usuário'
    })
    @IsUUID(undefined,{
        message:'Informe um UUID válido'
    })
    readonly id: string

}