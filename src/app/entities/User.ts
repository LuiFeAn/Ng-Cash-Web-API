import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToOne } from 'typeorm';

import { hashSync } from 'bcrypt';

import Account from './Account';

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar',{ length:'150' })
    username: string;

    @Column('varchar',{ length:'150' })
    password: string;

    @OneToOne( () => Account, account => account.user )
    account: Account

    @BeforeInsert()
    private addHashToPassword(){
        this.password = hashSync(this.password,10);
    }

}

export default User;
