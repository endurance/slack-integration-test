import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFullModel1575649656218 implements MigrationInterface {
    name = 'CreateFullModel1575649656218'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "public"."slack_profile" ("id" SERIAL NOT NULL, "title" character varying, "phone" character varying, "skype" character varying, "real_name" character varying, "real_name_normalized" character varying, "display_name" character varying, "display_name_normalized" character varying, "fields" character varying, "status_text" character varying, "status_emoji" character varying, "status_expiration" integer, "avatar_hash" character varying, "always_active" boolean, "first_name" character varying, "last_name" character varying, "image_original" character varying, "bot_id" character varying, "is_custom_image" boolean, "image_24" character varying, "image_32" character varying, "image_48" character varying, "image_72" character varying, "image_192" character varying, "image_512" character varying, "image_1024" character varying, "status_text_canonical" character varying, "team" character varying, "api_app_id" character varying, CONSTRAINT "PK_9ed079dc2d6e33d856e36b45b44" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "public"."slack_users" ("id" SERIAL NOT NULL, "slack_id" character varying NOT NULL, "team_id" character varying, "name" character varying, "deleted" boolean, "color" character varying, "real_name" character varying, "tz" character varying, "tz_label" character varying, "tz_offset" integer, "is_admin" boolean, "is_owner" boolean, "is_primary_owner" boolean, "is_restricted" boolean, "is_ultra_restricted" boolean, "is_bot" boolean, "is_app_user" boolean, "updated" integer, "has_2fa" boolean, "locale" boolean, "profile_id" integer NOT NULL, CONSTRAINT "REL_a133be6480f7a762118e9bdf70" UNIQUE ("profile_id"), CONSTRAINT "PK_2b12f4f70047866192ef7eeee73" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "public"."slack_users" ADD CONSTRAINT "FK_a133be6480f7a762118e9bdf706" FOREIGN KEY ("profile_id") REFERENCES "public"."slack_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."slack_users" DROP CONSTRAINT "FK_a133be6480f7a762118e9bdf706"`, undefined);
        await queryRunner.query(`DROP TABLE "public"."slack_users"`, undefined);
        await queryRunner.query(`DROP TABLE "public"."slack_profile"`, undefined);
    }

}
