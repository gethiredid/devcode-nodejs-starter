# Devcode Starter using Node.js and Express.js Level 1

## Hasil Akhir yang Diharapkan

Peserta dapat menampilkan message hello world dalam format JSON pada url http://localhost:3030/hello dan submit challenge di devcode menggunakan docker

## Setup Environment

1. Download source code melalui link yang telah disediakan dari halaman assesment
2. Extract source code yang sudah terdownload pada perangkat anda
3. Buka source code yang sudah diextract menggunakan Code Editor, contoh Visual Studio Code
4. Salin isi dari file `.env.example` ke dalam file `.env`
5. Jalankan`npm install` pada terminal
6. Jalankan`npm start` atau `npm run dev` untuk mode development pada terminal

## Instruksi pengerjaan

1. Pastikan anda sudah meng-install tools yang diperlukan. Jika belum, silahkan ikuti langkah-langkahnya [disini](#menginstal-tools-yang-diperlukan)
2. Lakukan unit testing pada local anda dengan menggunakan Docker, langkah-langkahnya dapat dilihat [disini](#menjalankan-unit-testing-dengan-Docker)
3. Push projek ke docker hub setelah semua test case berhasil dijalankan, langkah-langkahnya dapat dilihat [disini](#push-projek-ke-docker-hub)
4. Submit image docker yang telah dipush ke Docker Hub ke Halaman Submission Devcode, langkah-langkahnya dapat dilihat [disini](#push-projek-ke-docker-hub)

## Tools dan Packages yang digunakan

1. [Git](https://git-scm.com)
2. [Docker](https://www.docker.com)
3. [Express.js](https://expressjs.com)
4. [nodemon](https://nodemon.io)
5. [Morgan](https://www.npmjs.com/package/morgan)

## Menginstal Tools yang diperlukan

-   [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
-   Docker
    -   [Windows](https://docs.docker.com/desktop/install/windows-install/)
    -   [Mac](https://docs.docker.com/desktop/install/mac-install/)
    -   [Linux](https://docs.docker.com/desktop/install/linux-install/)

## Menjalankan unit testing dengan Docker

### Build docker image

Jalankan perintah berikut untuk Build docker image `docker build . -t {name}`

contoh :

```
docker build . -t nodejs-hello
```

### Jalankan docker image

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

## Submit Image Docker ke Devcode

### Build docker image

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
