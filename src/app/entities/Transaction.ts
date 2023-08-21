import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
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
    creditedAt:string;

    @OneToMany( () => Account, account => account.transactions )
    @JoinColumn()
    account: Account[]

}

export default Transaction
