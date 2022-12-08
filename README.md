# Devcode node.js starter with express.js - Level 2

## Hasil akhir yang diharapkan

Peserta dapat membuat dan menampilkan data kontak.

## Instruksi pengerjaan

Terdapat 2 route pada file `app.js` yaitu :

- GET `/contacts`
- POST `/contacts`

Anda dapat mengubah kedua route tersebut agar request dan response sesuai dengan [dokumentasi API](https://documenter.getpostman.com/view/6584319/2s8Yt1rUtN) pada postman.

Pastikan juga semua test berhasil ketika menjalankan unit testing lokal.

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
- nodemon

## Menjalankan projek

- copy `.env.example` to `.env`
- install package `npm install`
- jalankan projek dengan perintah `npm start` atau `npm run dev` untuk mode development

# Menjalankan unit testing dengan docker

Pastikan docker sudah terinstall di komputer anda. Jika belum silahkan install terlebih dahulu mengikuti instruksi dari tutorial diatas.

## Build docker image
Jalankan perintah berikut untuk Build docker image  `docker build . -t {name}`

contoh :
```
docker build . -t nodejs-hello
```

## Jalankan docker image
Jalankan docker image dengan perintah `docker run -e PORT=3030 -p 3030:3030 {docker image}`

contoh: 
```
docker run -e PORT=3030 -p 3030:3030 nodejs-hello
```

## Jalankan unit testing

Pastikan port ketika menjalankan docker image sama dengan `API_URL` ketika ingin menjalankan unit testing.

Jalankan perintah berikut untuk menjalankan unit testing di local:

```
docker run --network="host" -e API_URL=http://localhost:3030 -e LEVEL=1 alfi08/hello-unit-testing
```



# Submit ke Devcode
## Build docker image
Jalankan perintah berikut untuk Build docker image  `docker build . -t {name}`

contoh :
```
docker build . -t nodejs-hello
```

## Push projek ke docker hub
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