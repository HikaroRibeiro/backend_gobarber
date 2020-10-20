import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterProviderFieldToProviderId1593517292153 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments','provider');

        await queryRunner.addColumn('appointments',new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable: true,
        }))

        await queryRunner.createForeignKey('appointments',new TableForeignKey({
            name: 'fk_Appointment_Provider',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments','fk_Appointment_Provider');

        await queryRunner.dropColumn('appointments','provider_id');

        await queryRunner.addColumn('appointments',new TableColumn({
            name: 'provider',
            type: 'varchar',
        }))
    }

}
