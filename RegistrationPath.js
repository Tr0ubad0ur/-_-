const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});

sequelize.sync();


const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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

app.listen(3000, () => console.log('Server running on port 3000'));