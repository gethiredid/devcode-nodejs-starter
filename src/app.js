require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const { migration, db } = require('./db');

const port = process.env.PORT || 5000;
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
    const [rows] = await db.query(`SELECT * FROM contacts`);
    res.json({ status: 'Success', data: rows });
});

// create contact
app.post('/contacts', async (req, res) => {
    // get data from request body
    const { full_name, phone_number, email } = req.body;

    if (!full_name || !phone_number || !email) {
        return res.status(400).json({
            status: 'Failed',
            message: 'full_name, phone_number, and email is required',
        });
    }

    // check if data is exist
    const [check] = await db.query(
        `select * from contacts where email = ? and full_name = ? and phone_number = ?`,
        [email, full_name, phone_number]
    );

    if (check.length) {
        return res.status(400).json({
            status: 'Failed',
            message: 'full_name, phone_number, and email is duplicate',
        });
    }

    // insert data into contacts table
    const [rows] = await db.query(
        `INSERT INTO contacts(full_name, phone_number, email) values(?,?,?)`,
        [full_name, phone_number, email]
    );

    res.json({
        status: 'Success',
        message: 'Contact created',
        data: {
            id: +rows.insertId,
            full_name,
            phone_number,
            email,
        },
    });
});

// update contact
app.put('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    // check if body request empty
    if (Object.keys(body).length === 0) {
        return res.status(400).json({
            status: 'Failed',
            message: 'no contact updated',
        });
    }

    const [check] = await db.query(`SELECT * FROM contacts where id = ?`, [id]);
    if (!check.length) {
        return res.status(400).json({
            status: 'Failed',
            message: `Contact with id ${id} is not found`,
        });
    }

    let query = ``;
    const values = [];

    // create query based on existing column(full_name, email, phone_number)
    for (const col in body) {
        if (!query.length) {
            query += `UPDATE contacts set ${col} = ?`;
        } else {
            query += `, ${col} = ? `;
        }
        values.push(body[col]);
    }

    // add where query
    query += `where id = ?`;
    values.push(id);

    // run query
    await db.query(query, values);

    res.json({
        status: 'Success',
        message: 'Contact updated',
        data: {
            id: +id,
            ...body,
        },
    });
});

// delete contact
app.delete('/contacts/:id', async (req, res) => {
    const { id } = req.params;

    const [check] = await db.query(`SELECT * FROM contacts where id = ?`, [id]);
    if (!check.length) {
        return res.status(400).json({
            status: 'Failed',
            message: `Contact with id ${id} is not found`,
        });
    }

    await db.query(`DELETE FROM contacts where id = ?`, [id]);

    res.json({
        status: 'Success',
        message: 'Contact deleted',
        deletedId: +id,
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
