import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

}

export default Transaction
