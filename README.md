# Memulai Backend dengan nodejs

## Package yang digunakan

- express.js
- morgan

## Menjalankan projek

- copy `.env.example` to `.env`
- install package `npm install`
- jalankan projek dengan perintah `npm start` atau `npm run dev` untuk mode development

# Menjalankan unit testing dengan docker

Pastikan docker sudah terinstall di komputer anda.

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

### Jalankan unit testing

Pastikan port ketika menjalankan docker image sama dengan `API_URL` ketika ingin menjalankan unit testing.

Jalankan perintah berikut untuk menjalankan unit testing di local:

```
docker run --network="host" -e API_URL=http://localhost:3030 -e LEVEL=1 alfi08/hello-unit-testing
```


## Masukan projek ke docker hub
Pastikan sudah memiliki akun docker hub, dan login akun docker anda di lokal dengan perintah `docker login`.

Setelah itu jalankan perintah berikut untuk push docker image lokal ke docker hub.

```
docker build . -t nodejs-hello
docker tag nodejs-hello {username docker}/nodejs-hello
docker push {username docker}/nodejs-hello
```