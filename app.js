const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const Sequelize = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});


//const sequelize = new Sequelize('database', 'username', 'password', {
 // host: 'localhost',
  //dialect: 'postgres',
  //database: 'postgres',
  //password: '1',
  //port: 5432,
//});

sequelize.authenticate()
  .then(() => {
    console.log('Соединение с базой данных установлено успешно.');
  })
  .catch(err => {
    console.error('Ошибка при подключении к базе данных:', err);
  });

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1',
  port: 5432,
});

//const Sequelize = require('sequelize');


const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});

sequelize.sync();

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
        'INSERT INTO records (name_records, genre, singer, year_records, company, type_records, id_cat) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name_records, genre, singer, year_records, company, type_records, id_cat]
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

  app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.create({ username, password, email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      // Здесь должна быть проверка пароля, но для простоты примера мы просто сравниваем строки
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      res.json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});