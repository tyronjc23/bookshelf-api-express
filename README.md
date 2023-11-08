# Bokkshelf-API-Express

## REST API using Node.js and Express Framework

REST APIs sederhana menggunakan [Express](https://expressjs.com)

## Setup

1. Import Bookshelf API Test.postman_collection.json di Postman
2. Import Bookshelf API Test.postman_environment.json di Postman
3. copy file `env.example` to `.env`
4. Buat database baru menggunakan mysql dan nama tabel bookshelf
5. Jalankan perintah

```
npx prisma db push
```

Prisma akan membuat tabel secara otomatis

6. Jalankan server

```
npm run start
```

server berjalan pada [`http://localhost:9000/`](http://localhost:9000)

## API

Jika file `Bookshelf API Test.postman_collection.json` dan `Bookshelf API Test.postman_environment.json` telah di import, API dapat langsung digunakan.
