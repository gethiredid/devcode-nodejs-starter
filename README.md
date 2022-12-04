# Devcode node.js starter with express.js

## Package yang digunakan

- express.js
- morgan
- mysql2

## Docker

Jika anda sudah menginstall docker, anda bisa menjalankan perintah `docker-compose up -d` untuk menjalankan API <b>Contact Manager</b> dan juga database <b>Mysql</b>. Tetapi pastikan `environment` pada file .env yang telah kamu dari .env.example sesuai dengan `environment` pada file `docker-compose.yaml`.

Apabila ada perubahan pada file kodingan anda, anda bisa build ulang container dengan perintah :
```
docker-compose up -d --force --recreate
``` 

## Menjalankan projek

- copy `.env.example` to `.env`
- Jalankan `docker-compose up -d` untuk menjalankan database dan api pada docker lokal
- install package `npm install`
- jalankan projek dengan perintah `npm start` atau `npm run dev` untuk mode development

## Migration 

Migrasi table berada pada fungsi `migration` di file `db.js`, fungsi migration dijalankan didalam fungsi `run` sebelum menjalankan server yang berada pada `app.js`. Anda bisa menyesuaikan fungsi `migration` dalam file `db.js` sesuai struktur data pada tabel yang ingin dibuat.

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
Dan pastikan anda telah menjalakan database dan api pada docker lokal, kalau belum jalankan perintah berikut  `docker-compose up -d`

Jalankan perintah berikut untuk melakukan unit testing:
```
docker run --network="host" -e API_URL=http://localhost:5000 -e LEVEL=3 alfi08/hello-unit-testing
```

## Upload projek ke docker hub
### Build docker image
Jalankan perintah berikut untuk Build docker image  `docker build . -t {name}`

contoh :
```
docker build . -t nodejs-contact-manager
```
## Push projek ke docker hub

Pastikan sudah memiliki akun docker hub, dan login akun docker anda di lokal dengan perintah `docker login`.

Setelah itu jalankan perintah berikut untuk push docker image lokal ke docker hub.

```
docker tag nodejs-contact-manager {username docker}/nodejs-contact-manager
docker push {username docker}/nodejs-contact-manager
```
