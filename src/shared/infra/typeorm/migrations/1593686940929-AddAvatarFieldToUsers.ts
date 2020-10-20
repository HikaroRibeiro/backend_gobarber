import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";
import { isThisQuarter } from "date-fns";

export default class AddAvatarFieldToUsers1593686940929 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.addColumn('users',new TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn('users','avatar');
    }

}
