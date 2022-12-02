const mysql = require('mysql2/promise');

// db connection
const db = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    database: process.env.MYSQL_DBNAME || 'test',
    password: process.env.MYSQL_PASSWORD || 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// db migration
const migration = async () => {
    try {
        await db.query(
            `
            CREATE TABLE IF NOT EXISTS contacts (
            id int not null auto_increment,
            full_name varchar(255) not null,
            phone_number varchar(255) not null,
            primary key (id)
            )
        `
        );
        console.log('Migration successfully');
    } catch (err) {
        throw err;
    }
};

module.exports = { db, migration };
