import {MigrationInterface, QueryRunner} from "typeorm";

export class MakeNamesNullable1575627193271 implements MigrationInterface {
    name = 'MakeNamesNullable1575627193271'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."slack_users" ALTER COLUMN "name" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "public"."slack_users" ALTER COLUMN "real_name" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."slack_users" ALTER COLUMN "real_name" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "public"."slack_users" ALTER COLUMN "name" SET NOT NULL`, undefined);
    }

}
