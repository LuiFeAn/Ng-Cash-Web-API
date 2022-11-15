import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    debitedAccountId: string;

    @Column('uuid')
    creditedAccountId: string;

    @Column('float')
    value: number;

    @Column('datetime')
    creditedAt:string;

}

export default Transaction
