# Devcode Starter using Node.js and Express.js Level 5

## Hasil akhir yang Diharapkan

Peserta dapat memvalidasi data dari request body sebelum data tersebut disimpan ke database

## Setup Environment

1. Download source code melalui link yang telah disediakan dari halaman assesment
2. Extract source code yang sudah terdownload pada perangkat anda
3. Buka source code yang sudah diextract menggunakan Code Editor, contoh Visual Studio Code
4. Salin isi dari file `.env.example` ke dalam file `.env`
5. Lakukan migrasi database dengan mengikuti langkah-langkahnya yang bisa dilihat [disini](#migrasi-database)
6. Jalankan`npm install` pada terminal
7. Jalankan`npm start` atau `npm run dev` untuk mode development pada terminal

## Instruksi Pengerjaan

1. Pastikan anda sudah meng-install tools yang diperlukan. Jika belum, silahkan ikuti langkah-langkahnya [disini](#menginstal-tools-yang-digunakan)
2. Jalankan API dan Database dengan Docker, silahkan ikuti langkah-langkahnya [disini](#menjalankan-api-dan-database-dengan-docker)
3. Tambahkan validasi pada data yang akan dijadikan request body di route POST, PUT, DELETE pada file `app.js`, untuk detail requirement validasinya dapat dilihat [disini](#detail-validasi-untuk-request-payload)
4. Push projek ke docker hub setelah semua test case berhasil dijalankan, langkah-langkahnya dapat dilihat [disini](#push-projek-ke-docker-hub)
5. Submit image docker yang telah dipush ke Docker Hub ke Halaman Submission Devcode, langkah-langkahnya dapat dilihat [disini](#push-projek-ke-docker-hub)

Untuk melihat contoh dari validasi API-nya, anda dapat mengakses [Dokumentasi API](https://documenter.getpostman.com/view/6584319/2s8Yt1rUtN#intro)

## Teknologi yang Digunakan

1. [Git](https://git-scm.com)
2. [Node.js](https://nodejs.org/en/about/)
3. [Docker](https://www.docker.com)
4. [Express.js](https://expressjs.com)
5. [nodemon](https://nodemon.io)
6. [Morgan](https://www.npmjs.com/package/morgan)

## Menginstal Tools yang Digunakan

-   [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
-   Docker
    -   [Windows](https://docs.docker.com/desktop/install/windows-install/)
    -   [Mac](https://docs.docker.com/desktop/install/mac-install/)
    -   [Linux](https://docs.docker.com/desktop/install/linux-install/)

## Detail validasi untuk Request Payload

-   Untuk route POST, validasi yang dibutuhkan adalah
    -   full_name, phone_number, email tidak boleh kosong
    -   full_name, phone_number, email yang akan disimpan tidak boleh sama dengan data yang sudah ada
-   Untuk route PUT, validasi yang dibutuhkan adalah
    -   full_name, phone_number, email tidak boleh kosong
    -   cek apakah id kontak yang akan diupdate ada di dalam database
-   Untuk route DELETE, validasi yang dibutuhkan adalah
    -   cek apakah id kontak yang akan diupdate ada di dalam database

## Menjalankan API dan Database dengan Docker

Jika anda sudah menginstall docker, anda bisa menjalankan perintah `docker-compose up -d` untuk menjalankan API <b>Contact Manager</b> dan juga database <b>Mysql</b>. Tetapi pastikan `environment` pada file .env yang telah kamu buat dari .env.example sesuai dengan `environment` pada file `docker-compose.yaml`.

Apabila ada perubahan pada file kodingan anda, anda bisa build ulang container dengan perintah :

```
docker-compose up -d --force-recreate
```

## Koneksi Database

Anda bebas menggunakan libary apapun untuk membuat koneksi pada database.

### Mysql

Contoh koneksi database Mysql menggunakan libary [mysql2](https://www.npmjs.com/package/mysql2).

```
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    database: process.env.MYSQL_DBNAME || 'hello',
    password: process.env.MYSQL_PASSWORD || 'root',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
```

### Posgresql

Contoh koneksi database Posgresql menggunakan libary [pg](https://www.npmjs.com/package/pg).

```
const pg = require('pg');
const db = new pg.Pool({
    host: process.env.PGSQL_HOST,
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    database: process.env.PGSQL_DBNAME,
    port: process.env.PGSQL_PORT,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
```

### Mongodb

Contoh koneksi database Mongodb menggunakan libary [mongodb](https://www.npmjs.com/package/mongodb).

```
const {MongoClient} = require('mongodb');
const mongoURI = `mongodb:127.0.0.1`;
const client = new MongoClient(mongoURI);
```

## Migrasi Database

Migrasi table berada pada fungsi `migration` di file `db.js`, fungsi migration dijalankan didalam fungsi `run` yang berada pada `app.js`. Anda bisa menyesuaikan fungsi `migration` dalam file `db.js` sesuai struktur data pada tabel yang ingin dibuat.

Contoh ketika ingin membuat migrasi sebuah tabel:

1. Mysql

```
await db.query(
        `
        CREATE TABLE IF NOT EXISTS contact (
            id int not null auto_increment,
            email varchar(255) not null,
            password varchar(255) not null,
            primary key (id)
        )
    `
);
```

2. Postgresql

```
await db.query(
        `
        CREATE TABLE IF NOT EXISTS contacts (
            id SERIAL,
            full_name varchar(255) not null,
            phone_number varchar(255) not null,
            email varchar(255) not null,
            primary key (id)
        )
    `
);
```

## Menjalankan Unit Testing dengan Docker

Pastikan environment database dan port API pada file `.env` sama dengan `file docker-compose.yaml`.
Dan pastikan anda telah menjalakan database dan api pada docker lokal, kalau belum jalankan perintah berikut `docker-compose up -d` atau `docker-compose up -d --build --force-recreate` untuk build ulang image ketika ada perubahan pada file.

Jalankan perintah berikut untuk melakukan unit testing:

```
docker run --network="host" -e API_URL=http://localhost:3030 -e LEVEL=5 alfi08/hello-unit-testing
```

## Submit ke Devcode

### Build Docker Image

Jalankan perintah berikut untuk Build docker image `docker build . -t {name}`

contoh :

```
docker build . -t devcode-nodejs
```

### Push projek ke Docker Hub

Pastikan sudah memiliki akun docker hub, dan login akun docker anda di lokal dengan perintah `docker login`.

Setelah itu jalankan perintah berikut untuk push docker image lokal ke docker hub.

```
docker tag devcode-nodejs {username docker}/devcode-nodejs
docker push {username docker}/devcode-nodejs
```

Setelah itu submit docker image ke Devcode.

```
{username docker}/devcode-nodejs
```
