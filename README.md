# Devcode Starter using Node.js and Express.js Level 3

## Hasil Akhir yang Diharapkan

Peserta dapat membuat dan menampilkan data kontak yang terkoneksi dengan database

## Setup Environment

1. Download source code melalui link yang telah disediakan dari halaman assesment
2. Extract source code yang sudah terdownload pada perangkat anda
3. Buka source code yang sudah diextract menggunakan Code Editor, contoh Visual Studio Code
4. Salin isi dari file `.env.example` ke dalam file `.env`
5. Jalankan`npm install` pada terminal
6. Jalankan`npm start` atau `npm run dev` untuk mode development pada terminal

## Instruksi Pengerjaan

1. Pastikan anda sudah meng-install tools yang diperlukan. Jika belum, silahkan ikuti langkah-langkahnya [disini](#menginstal-tools-yang-digunakan)
2. Sesuaikan request dan response pada route GET `/contacts` pada file `app.js` sesuai dengan [Dokumentasi API](https://documenter.getpostman.com/view/6584319/2s8Yt1rUtN) pada Postman
3. Sesuaikan request dan response pada route POST `/contacts` pada file `app.js` sesuai dengan [Dokumentasi API](https://documenter.getpostman.com/view/6584319/2s8Yt1rUtN) pada Postman
4. Lakukan unit testing pada local anda dengan menggunakan Docker, langkah-langkahnya dapat dilihat [disini](#menjalankan-unit-testing-dengan-Docker)
5. Push projek ke docker hub setelah semua test case berhasil dijalankan, langkah-langkahnya dapat dilihat [disini](#push-projek-ke-docker-hub)
6. Submit image docker yang telah dipush ke Docker Hub ke Halaman Submission Devcode, langkah-langkahnya dapat dilihat [disini](#push-projek-ke-docker-hub)

## Tools dan Packages yang Digunakan

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

## Menjalankan API dan Database dengan Docker

Jika anda sudah menginstall docker, anda bisa menjalankan perintah `docker-compose up -d` untuk menjalankan API <b>Contact Manager</b> dan juga database <b>Mysql</b>. Tetapi pastikan `environment` pada file .env yang telah kamu buat dari .env.example sesuai dengan `environment` pada file `docker-compose.yaml`.

Apabila ada perubahan pada file kodingan anda, anda bisa build ulang container dengan perintah :

```
docker-compose up -d --force --recreate
```

## Migrasi Database

Migrasi table berada pada fungsi `migration` di file `db.js`, fungsi migration dijalankan didalam fungsi `run` yang berada pada `app.js`. Anda bisa menyesuaikan fungsi `migration` dalam file `db.js` sesuai struktur data pada tabel yang ingin dibuat.

Contoh ketika ingin membuat 2 tabel:

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

await db.query(
        `
        CREATE TABLE IF NOT EXISTS city (
        id int not null auto_increment,
        city_name varchar(255) not null,
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
docker run --network="host" -e API_URL=http://localhost:3030 -e LEVEL=3 alfi08/hello-unit-testing
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
