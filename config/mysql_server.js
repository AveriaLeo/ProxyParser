/**
 * Created by leonid on 14.07.16.
 */

module.exports = {
    database: 'proxy',
    username: 'root',
    password: 'my-secret-pw',
    options: {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
};