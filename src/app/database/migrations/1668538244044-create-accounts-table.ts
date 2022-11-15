import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createAccountsTable1668538244044 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

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
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('accounts');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');

    }

}
