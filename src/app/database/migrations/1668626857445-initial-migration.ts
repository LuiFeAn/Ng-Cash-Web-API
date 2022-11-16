import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class initialMigration1668626857445 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(' CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable( new Table({
            name:'accounts',
            columns:[
                {
                    name:'id',
                    type:'uuid',
                    isPrimary:true,
                    generationStrategy: 'uuid',
                    default:'uuid_generate_v4()',
                },
                {
                    name:'balance',
                    type:'float',
                    default:100.00
                }
            ],
        }));

        await queryRunner.createTable(new Table({

            name:'users',
            columns:[
                {
                    name:'id',
                    type:'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default:'uuid_generate_v4()',
                },
                {
                    name:'username',
                    type:'varchar',
                    isUnique:true,
                },
                {
                    name:'password',
                    type:'varchar',
                },
                {
                    name:'accountId',
                    type:'uuid',
                    isNullable:true,

                }
            ],

        }));

        await queryRunner.createForeignKey('users',new TableForeignKey({
            columnNames:['accountId'],
            referencedTableName:'accounts',
            referencedColumnNames:['id'],
        }));


        await queryRunner.createTable(new Table({

            name:'transactions',
            columns:[
                {
                    name:'id',
                    type:'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default:'uuid_generate_v4()',
                },
                {
                    name:'debitedAccountId',
                    type:'uuid',
                },
                {
                    name:'creditedAccountId',
                    type:'uuid',
                },
                {
                    name:'value',
                    type:'float',

                },
                {
                    name:'creditedAt',
                    type:'time',
                    default:'CURRENT_TIMESTAMP'
                }
            ],

        }));

        await queryRunner.createForeignKey('transactions',new TableForeignKey({
            columnNames:['creditedAccountId'],
            referencedTableName:'accounts',
            referencedColumnNames:['id'],
        }));

        await queryRunner.createForeignKey('transactions',new TableForeignKey({
            columnNames:['debitedAccountId'],
            referencedTableName:'accounts',
            referencedColumnNames:['id'],
        }));


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
