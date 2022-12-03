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
Jalankan docker image dengan perintah `docker run -e PORT=5000 -p 5000:5000 {docker image}`

contoh: 
```
docker run -e PORT=5000 -p 5000:5000 nodejs-hello
```

### Jalankan unit testing

pastikan port ketika menjalankan docker image sama dengan `API_URL` ketika ingin menjalankan unit testing

```
docker run --network="host" -e API_URL=http://localhost:5000 alfi08/hello-unit-testing
```


## Masukan projek ke docker hub
Pastikan sudah memiliki akun docker hub, dan login akun docker anda di lokal dengan perintah `docker login`.

Setelah itu jalankan perintah berikut untuk push docker image lokal ke docker hub.

```
docker tag nodejs-hello {username docker}/nodejs-hello
docker push {username docker}/nodejs-hello
```