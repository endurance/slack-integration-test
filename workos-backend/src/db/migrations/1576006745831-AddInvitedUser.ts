import {MigrationInterface, QueryRunner} from "typeorm";

export class AddInvitedUser1576006745831 implements MigrationInterface {
    name = 'AddInvitedUser1576006745831'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."slack_users" ADD "is_invited_user" boolean`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."slack_users" DROP COLUMN "is_invited_user"`, undefined);
    }

}
