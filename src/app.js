require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const { migration, db } = require('./db');

const port = process.env.PORT || 3030;
const host = process.env.HOST || 'localhost';

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello world' });
});

// get all contacts
app.get('/contacts', async (req, res) => {
    // query for getting all data from contacts table

    // TODO: ambil semua data kontak dari database
    const [rows] = await db.query(`SELECT email FROM contacts`);

    res.json({ status: 'Success', data: [] });
});

// create contact
app.post('/contacts', async (req, res) => {
    // get data from request body
    const { full_name, phone_number, email } = req.body;

    // TODO: simpan data dari request body kedalam database

    res.json({
        status: 'Success',
        message: 'Contact created',
        data: {},
    });
});

// 404 endpoint middleware
app.all('*', (req, res) => {
    res.status(404).json({ message: `${req.originalUrl} not found!` });
});

// error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message || 'An error occurred.',
    });
});

const run = async () => {
    await migration(); // 👈 running migration before server
    app.listen(port); // running server
    console.log(`Server run on http://${host}:${port}/`);
};

run();
