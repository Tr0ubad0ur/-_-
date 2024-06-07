const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017/";

const app = express();
app.use(express.json());

app.use(cors());

//app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'app/backend/frontend')));
app.use(express.static(path.join(__dirname, '../frontend')));

// Обработчик для корневого пути
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/home.html'));
});



//app.get('/main/:page', (req, res) => {
//       const page = req.params.page;
//       res.sendFile(path.join(__dirname, '../frontend/${page}.html'));
//   });


// app.get('/shop/:page', (req, res) => {
//       const page = req.params.page;
//       res.sendFile(path.join(__dirname, '../frontend/shop-elements-html/${page}.html'));
//   });


// app.get('/sub/:page', (req, res) => {
//       const page = req.params.page;
//       res.sendFile(path.join(__dirname, '../frontend/sub-pages-html/${page}.html'));
//   });


app.post('/register', async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const middlename = req.body.middlename;
    const mail = req.body.mail;
    const password = req.body.password;
    const male = req.body.male;
    const age = req.body.age;
    const user_district = req.body.user_district;

    try {
        const mongoClient = new MongoClient(url);
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("users");

        // Хеширование пароля перед сохранением в базе данных
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание нового документа пользователя
        const user = {
            name: name,
            surname: surname,
            middlename: middlename,
            mail: mail,
            password: hashedPassword,
            male: male,
            age: age,
            user_district: user_district
        };

        // Вставка документа пользователя в коллекцию
        const result = await collection.insertOne(user);
        console.log(`Пользователь ${name} зарегистрирован с id: ${result.insertedId}`);
        res.status(200).send(`Пользователь ${name} зарегистрирован`);

    } catch (err) {
        console.log(err);
        res.status(500).send('Ошибка при регистрации пользователя');
    }
});



app.post('/login', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    
    
    try {
        const mongoClient = new MongoClient(url);
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("users");

        // Поиск пользователя по имени пользователя
        const user = await collection.findOne({ name: name });

        if (!user) {
            return res.status(401).send('Неверное имя пользователя или пароль');
        }

        // Проверка пароля
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Неверное имя пользователя или пароль');
        }

        // Если пользователь найден и пароль совпадает, отправляем ответ
        res.status(200).send('Вход выполнен успешно');

    } catch (err) {
        console.log(err);
        res.status(500).send('Ошибка при входе в систему');
    }
});

const port = 3010;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});