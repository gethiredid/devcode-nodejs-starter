# Devcode Starter using Node.js and Express.js Level 1

## Hasil Akhir yang Diharapkan

Peserta dapat menampilkan message hello world dalam format JSON pada url http://localhost:3030/hello dan submit challenge di Devcode menggunakan Docker

## Setup Environment

1. Download source code melalui link yang telah disediakan dari halaman assesment
2. Extract source code yang sudah terdownload pada perangkat anda
3. Buka source code yang sudah diextract menggunakan Code Editor, contoh Visual Studio Code
4. Salin isi dari file `.env.example` ke dalam file `.env`
5. Jalankan`npm install` pada terminal
6. Jalankan`npm start` atau `npm run dev` untuk mode development pada terminal

## Instruksi Pengerjaan

1. Pastikan anda sudah meng-install tools yang diperlukan. Jika belum, silahkan ikuti langkah-langkahnya [disini](#menginstal-tools-yang-digunakan)
2. Uncomment baris kode yang terdapat pada file`src/app.js`
3. Lakukan unit testing pada local anda dengan menggunakan Docker, langkah-langkahnya dapat dilihat [disini](#menjalankan-unit-testing-dengan-Docker)
4. Push projek ke docker hub setelah semua test case berhasil dijalankan, langkah-langkahnya dapat dilihat [disini](#push-projek-ke-docker-hub)
5. Submit image docker yang telah dipush ke Docker Hub ke Halaman Submission Devcode, langkah-langkahnya dapat dilihat [disini](#push-projek-ke-docker-hub)

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

## Menjalankan Unit Testing dengan Docker

### Build Docker Image

Jalankan perintah berikut untuk Build docker image `docker build . -t {name}`

contoh :

```
docker build . -t nodejs-hello
```

### Jalankan Docker Image

Jalankan docker image dengan perintah `docker run -e PORT=3030 -p 3030:3030 {docker image}`

contoh:

```
docker run -e PORT=3030 -p 3030:3030 nodejs-hello
```

### Jalankan Unit Testing

Pastikan port ketika menjalankan docker image sama dengan `API_URL` ketika ingin menjalankan unit testing.

Jalankan perintah berikut untuk menjalankan unit testing di local:

```
docker run --network="host" -e API_URL=http://localhost:3030 -e LEVEL=1 alfi08/hello-unit-testing
```

## Submit Docker Image ke Devcode

### Build Docker Image

Jalankan perintah berikut untuk Build docker image `docker build . -t {name}`

Contoh :

```
docker build . -t nodejs-hello
```

### Push projek ke Docker Hub

Pastikan sudah memiliki akun docker hub, dan login akun docker anda di lokal dengan perintah `docker login`.

Setelah itu jalankan perintah berikut untuk push docker image lokal ke docker hub.

```
docker tag nodejs-hello {username docker}/nodejs-hello
docker push {username docker}/nodejs-hello
```

Setelah itu submit docker image ke Devcode.

```
{username docker}/nodejs-hello
```
