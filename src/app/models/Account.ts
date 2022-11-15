import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('accounts')
class Account {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('varchar')
    balance:number;

}

export default Account;
