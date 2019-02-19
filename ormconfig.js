module.exports = {
    type: "mongodb",
    host: "localhost",
    port: 27017,
    entities: ["dist/models/**/*.js"],
    database: "online-ordering",
    useNewUrlParser: true,
    logging: 'all',
    synchronize: true
}