module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "hurmat",
    database: "online-ordering",
    entities: ["dist/models/**/*.js"],
    migrationsTableName: "custom_migration_table",
    migrations: ["dist/migrations/**/*.js"],
    logging: 'error',
    synchronize: true,
    cli: {
        "migrationsDir": "migration"
    }
}