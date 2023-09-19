import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';

import User from './User';

import Transaction from './Transaction';

@Entity('accounts')
class Account {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @OneToOne( () => User, user => user.account )
    @JoinColumn()
    user: User

    @Column('float',{
        default:100.000
    })
    balance:number;

    @OneToMany( () => Transaction, transaction => transaction.account )
    @JoinColumn()
    transactions: Transaction []


}

export default Account;
