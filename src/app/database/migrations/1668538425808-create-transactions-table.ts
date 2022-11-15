import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createTransactionsTable1668538425808 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>{

        await queryRunner.query(' CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

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
    }

    public async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.dropTable('transactions');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');

    }


}
