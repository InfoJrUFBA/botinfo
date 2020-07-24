export class addEntities1595597775005{
    name = 'addEntities1595597775005'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "gitlab" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_be5ae853f52c6a8a21078e167aa"`);
    }

    async down(queryRunner){
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_be5ae853f52c6a8a21078e167aa" UNIQUE ("gitlab")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "gitlab" SET NOT NULL`);
    }

}
