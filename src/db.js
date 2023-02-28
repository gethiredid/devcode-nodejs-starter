const mysql = require('mysql2/promise');

// koneksi ke database mysql
const db = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    database: process.env.MYSQL_DBNAME || 'hello',
    password: process.env.MYSQL_PASSWORD || 'root',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// migrasi database mysql
const migration = async () => {
    try {
         // query mysql untuk membuat table contacts
        await db.query(
            `
            CREATE TABLE IF NOT EXISTS contacts (
            id int not null auto_increment,
            full_name varchar(255) not null,
            phone_number varchar(255) not null,
            email varchar(255) not null,
            primary key (id)
            )
        `
        );
        console.log('Running Migration Successfully!');
    } catch (err) {
        throw err;
    }
};

// TODO: Lengkapi fungsi dibawah ini untuk mengambil data didalam database
const find = async () => {

}

// TODO: Lengkapi fungsi dibawah ini untuk menyimpan data kedalam database
const create = async (data) => {

}

module.exports = { migration, find, create };
