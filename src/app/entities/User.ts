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
    async addHashToPassword(){
        this.password = hashSync(this.password,10);
    }

}

export default User;
