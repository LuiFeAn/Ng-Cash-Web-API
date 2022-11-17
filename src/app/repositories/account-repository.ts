import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('accounts')
class Account {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('float')
    balance:number;

}

export default Account;
