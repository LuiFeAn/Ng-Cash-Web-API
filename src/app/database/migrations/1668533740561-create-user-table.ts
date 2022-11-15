import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createUserTable1668533740561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>{

        await queryRunner.query(' CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

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
    }

    public async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.dropTable('users');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');

    }

}
