import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import AppDataSource from '../database';
import { hashSync } from 'bcrypt';

import Account from './Account';

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    username: string;

    @Column('varchar')
    password: string;

    @Column('uuid')
    accountId: string;

    //Após a inserção bem sucedida de um novo usuário
    @BeforeInsert()
    async addHashAndFkAccount(){

        //Sua senha é haseada pelo bcrypt
        this.password = hashSync(this.password,10);
        //É criado um novo registro na tabela accounts com um balance de 100R$
        const accountRepository = AppDataSource.getRepository(Account);
        const balance = accountRepository.create({ balance: 100.000});
        //Salva o retorno do novo registro criado
        const newAccount = await accountRepository.save(balance);
        //O usuário criado recebe a FK deste novo registro
        const { id: fkAccountId } = newAccount;
        this.accountId = fkAccountId;

    }

}

export default User;
