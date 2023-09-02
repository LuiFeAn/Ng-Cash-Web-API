import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';

import Account from './Account';

@Entity('transactions')
class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    debitedAccountId: string;

    @Column('uuid')
    creditedAccountId: string;

    @Column('int')
    value: number;

    @Column('timestamp')
    @CreateDateColumn()
    creditedAt:string;

    @OneToMany( () => Account, account => account.transactions )
    account: Account

}

export default Transaction
