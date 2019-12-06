import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSlackUserEntity1575627094660 implements MigrationInterface {
    name = 'AddSlackUserEntity1575627094660'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "public"."slack_users" ("id" SERIAL NOT NULL, "slack_id" character varying NOT NULL, "name" character varying NOT NULL, "real_name" character varying NOT NULL, CONSTRAINT "PK_2b12f4f70047866192ef7eeee73" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "public"."slack_users"`, undefined);
    }

}
