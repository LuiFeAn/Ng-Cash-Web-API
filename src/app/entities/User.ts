import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToOne } from 'typeorm';
import { accountRepository } from '../repositories/account-repository';
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

    @OneToOne( () => Account, account => account.user )
    account: Account

    @BeforeInsert()
    @BeforeUpdate()
    async addHashAndFkAccount(){

        this.password = hashSync(this.password,10);

        const balance = accountRepository.create({ 
            balance: 100.000
        });

        const newAccount = await accountRepository.save(balance);

        const { id: fkAccountId } = newAccount;

        this.accountId = fkAccountId;

    }

}

export default User;
