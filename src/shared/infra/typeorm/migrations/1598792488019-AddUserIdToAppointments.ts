import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";
import { addISOWeekYears } from "date-fns";

export default class AddUserIdToAppointments1598792488019 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('appointments',new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
        }))

        await queryRunner.createForeignKey('appointments',new TableForeignKey({
            name: 'fk_AppointmentUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments','fk_AppointmentUser');
        await queryRunner.dropColumn('appointments','user_id');
    }

}
