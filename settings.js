module.exports = {
    logging: {
        level: 'error'
    },
    mysql: {
        database: 'app',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456'
    },
    snowflake: {
        databaseid: 1,
        workerid: 1,
        sequence: 1
    }
}