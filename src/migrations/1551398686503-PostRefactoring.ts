import {MigrationInterface, QueryRunner} from "typeorm";
import * as bcrypt from 'bcrypt';

import { Manager } from "../models/Manager";

export class PostRefactoring1551398686503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const manager: Manager = new Manager();

        const password = "qwer123!";

        manager.email = "manager@softarex.com";
        manager.password = bcrypt.hashSync(password, 12);

        await queryRunner.manager.getRepository(Manager).save(manager);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.manager.getRepository(Manager).delete({ email: "manager@softarex.com"})
    }

}
