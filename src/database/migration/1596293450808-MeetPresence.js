export class MeetPresence1596293450808 {
    name = 'MeetPresence1596293450808'

    async up (queryRunner) {
      await queryRunner.query('CREATE TABLE "meet_presence" ("id" SERIAL NOT NULL, "meet" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_a3d59c146be3cd0ba5fe5eecd12" UNIQUE ("meet", "userId"), CONSTRAINT "PK_1e6a3d97fb5042981e08d0453ef" PRIMARY KEY ("id"))')
      await queryRunner.query('ALTER TABLE "meet_presence" ADD CONSTRAINT "FK_e80ffdd4846b4642146daee2e30" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    async down (queryRunner) {
      await queryRunner.query('ALTER TABLE "meet_presence" DROP CONSTRAINT "FK_e80ffdd4846b4642146daee2e30"')
      await queryRunner.query('DROP TABLE "meet_presence"')
    }
}
