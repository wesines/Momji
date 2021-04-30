const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: "momjidatabase"
});
const getConnection = async () => {
    try {
        return new Promise(function (resolve, reject) {
            pool.getConnection().then(function (connection) {
                console.log("connection is done successfully")
                resolve(connection);
            }).catch(function (error) {
                console.log("NO connection ")
                reject(error);
            });
        });
    } catch (err) {
        console.log(err.message)
    }
}
module.exports = getConnection
