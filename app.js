const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reg',
  password: '1',
  port: 5432,
});
app.get('/records', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM records');
      res.json(result.rows);
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching records.' });
    }
  });
  
  app.post('/records', async (req, res) => {
    const { name, genre, singer, year, company, type, id_cat } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO records (name, genre, singer, year, company, type, id_cat) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, genre, singer, year, company, type, id_cat]
      );
      res.json(result.rows[0]);
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating a record.' });
    }
  });
  app.get('/catalog', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM catalog');
      res.json(result.rows);
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching catalog entries.' });
    }
  });
  
  app.post('/catalog', async (req, res) => {
    const { song, price, disk, id_mag } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO catalog (song, price, disk, id_mag) VALUES ($1, $2, $3, $4) RETURNING *',
        [song, price, disk, id_mag]
      );
      res.json(result.rows[0]);
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating a catalog entry.' });
    }
  });
  app.get('/store', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM store');
      res.json(result.rows);
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching store entries.' });
    }
  });
  
  app.post('/store', async (req, res) => {
    const { list_song, price, quantity, have, id_store } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO store (list_song, price, quantity, have, id_store) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [list_song, price, quantity, have, id_store]
      );
      res.json(result.rows[0]);
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating a store entry.' });
    }
  });
  const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});