# Devcode node.js starter with express.js and database

## Tools yang di perlukan

- Git
- Docker 

### Cara menginstall Tools

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

- Docker : 
    - [Windows](https://docs.docker.com/desktop/install/windows-install/)
    - [Mac](https://docs.docker.com/desktop/install/mac-install/)
    - [Linux](https://docs.docker.com/desktop/install/linux-install/)

## Packages yang digunakan

- express.js
- morgan
- mysql2
- nodemon

## Docker

Jika anda sudah menginstall docker, anda bisa menjalankan perintah `docker-compose up -d` untuk menjalankan API <b>Contact Manager</b> dan juga database <b>Mysql</b>. Tetapi pastikan `environment` pada file .env yang telah kamu buat dari .env.example sesuai dengan `environment` pada file `docker-compose.yaml`.

Apabila ada perubahan pada file kodingan anda, anda bisa build ulang container dengan perintah :
```
docker-compose up -d --build --force-recreate
``` 

## Menjalankan projek

- copy `.env.example` ke `.env` dan sesuaikan config untuk server dan database.
- install package dengan perintah `npm install`.
- jalankan projek dengan perintah `npm start` atau `npm run dev` untuk mode development.

## Migration 

Migrasi table berada pada fungsi `migration` di file `db.js`, fungsi migration dijalankan didalam fungsi `run` yang berada pada `app.js`. Anda bisa menyesuaikan fungsi `migration` dalam file `db.js` sesuai struktur data pada tabel yang ingin dibuat.

Contoh ketika ingin membuat 2 tabel: 
```
await db.query(
        `
        CREATE TABLE IF NOT EXISTS users (
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

# Menjalankan unit testing dengan docker

Pastikan environment database dan port API pada file `.env` sama dengan `file docker-compose.yaml`.
Dan pastikan anda telah menjalakan database dan api pada docker lokal, kalau belum jalankan perintah berikut  `docker-compose up -d` atau `docker-compose up -d --build --force-recreate` untuk build ulang image ketika ada perubahan pada file.

Jalankan perintah berikut untuk melakukan unit testing:
```
docker run --network="host" -e API_URL=http://localhost:3030 -e LEVEL={level} alfi08/hello-unit-testing
```

# Submit ke Devcode
## Build docker image
Jalankan perintah berikut untuk Build docker image  `docker build . -t {name}`

contoh :
```
docker build . -t devcode-nodejs
```


## Push projek ke docker hub

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
