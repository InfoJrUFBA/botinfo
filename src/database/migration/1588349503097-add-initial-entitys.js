export class addInitialEntitys1588349503097 {
    name = 'addInitialEntitys1588349503097'

    async up (queryRunner) {
      await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "discord_id" character varying NOT NULL, "name" character varying NOT NULL, "bio" character varying, "curso" character varying, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a695038a038c00cf65735299628" UNIQUE ("discord_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))', undefined)
      await queryRunner.query('CREATE TABLE "status_time" ("id" SERIAL NOT NULL, "start" TIMESTAMP NOT NULL, "end" TIMESTAMP, "status" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_e7ca3cdacd4a99204db072ed143" PRIMARY KEY ("id"))', undefined)
      await queryRunner.query('ALTER TABLE "status_time" ADD CONSTRAINT "FK_31de71612fa417ee298d6a6efb6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION', undefined)
    }

    async down (queryRunner) {
      await queryRunner.query('ALTER TABLE "status_time" DROP CONSTRAINT "FK_31de71612fa417ee298d6a6efb6"', undefined)
      await queryRunner.query('DROP TABLE "status_time"', undefined)
      await queryRunner.query('DROP TABLE "user"', undefined)
    }
}
