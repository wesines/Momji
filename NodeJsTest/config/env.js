const env = {
    host: 'localhost',
    username: 'root',
    password: '123456',
    database: "momjidatabase",
    dialect: 'mariadb',
    dialectOptions: {
        socketPath: process.env.db_socket,
        timezone: process.env.db_timezone
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        charset: 'utf8',
        timestamps: false
    },
    benchmark: false,
    logging: true
};

module.exports = env;