import {MigrationInterface, QueryRunner, Table} from "typeorm";
import * as bcrypt from 'bcrypt';

import { Manager } from "../models/Manager";

export class PostRefactoring1551398686503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const manager: Manager = new Manager();

        await queryRunner.createTable(new Table({
            name: "managers",
            columns:[
                {
                    name: "uuid",
                    type: "uuid",
                    generationStrategy: "uuid",
                    isGenerated: true,
                    isNullable: false
                },
                {
                    name: "created_date",
                    type: "timestamp without time zone",
                    isNullable: false,
                    default: "now()"
                },
                {
                    name: "password",
                    type: "character varying",
                    isNullable: false
                },
                {
                    name: "email",
                    type: "character varying",
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
