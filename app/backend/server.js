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

// 1. Получение перечня всех записей заданного жанра
app.get('/Record', async (req, res) => {
    const genre = req.params.genre;
    try {
        const Record = await db.collection('Record').find({ genre }).toArray();
        res.json(Record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// 2. Получение списка самых продаваемых записей
app.get('/Record', async (req, res) => {
    try {
        const Record = await db.collection('Record').find().sort({ sales: -1 }).limit(10).toArray();
        res.json(Record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// 3. Исполнитель самых продаваемых произведений
app.get('/Record', async (req, res) => {
    try {
        const result = await db.collection('Record').aggregate([
            { $group: { _id: "performer", totalSales: { $sum: "NumberOfSales" } } },
            { $sort: { totalSales: -1 } },
            { $limit: 1 }
        ]).toArray();
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Перечень отсутствующих в магазине записей
app.get('/Record', async (req, res) => {
    try {
        const records = await db.collection('Record').find({ availability: "Нет" }).toArray();
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Стоимость всех проданных записей
app.get('/Record', async (req, res) => {
    try {
        const result = await db.collection('Record').aggregate([
            { $group: { _id: null, totalCost: { $sum: { $multiply: ["price", "NumberOfSales"] } } } }
        ]).toArray();
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// 6. Запись с максимальной разницей между розничной и оптовой ценой
app.get('/Record', async (req, res) => {
    try {
        const result = await db.collection('Record').aggregate([
            { $project: { name: 1, retailPrice: 1, wholesalePrice: 1, difference: { $subtract: ["price", "opt_price"] } } },
            { $sort: { difference: -1 } },
            { $limit: 1 }
        ]).toArray();
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/Record', async (req, res) => {
    const id = req.body._id;
    const catalog_Id = req.body.catalog_Id;
    const name = req.body.name;
    const mail = req.body.mail;
    const genre = req.body.genre;
    const performer = req.body.performer;
    const year = req.body.year;
    const company = req.body.company;
    const type_of_media = req.body.type_of_media;
    const price = req.body.price;
    const opt_price = req.body.opt_price;
    const NumberOfSales = req.body.NumberOfSales;
    const availability = req.body.availability;

    try {
        const mongoClient = new MongoClient(url);
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("Record");

        

        // Создание нового документа пользователя
        const user = {
            _id: _id,
            catalog_Id: catalog_Id,
            name: name, 
            genre: genre, 
            performer: performer,
            year: year,
            company: company,
            type_of_media: type_of_media,
            price: price,
            opt_price: opt_price,
            NumberOfSales: NumberOfSales,
            availability: availability,
        };

        // Вставка документа пользователя в коллекцию
        const result = await collection.insertOne(user);
        console.log(`Запись ${name} добавлена с id: ${result.catalog_Id}`);
        res.status(200).send(`Запись ${name} добавленан`);

    } catch (err) {
        console.log(err);
        res.status(500).send('Ошибка при добавлена записи');
    }
});
// Удаление записи
app.delete('/records/:id', async (req, res) => {
    try {
        const result = await Record.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Получение всех записей
app.get('/Record', async (req, res) => {
    try {
        const records = await Record.find();
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Получение информации о произведениях
app.get('/Record', async (req, res) => {
    try {
        const works = await Record.find({}, { _id: 1, catalog_Id: 1, name: 1, genre: 1, performer: 1, year: 1, company: 1, type_of_media: 1, price: 1, opt_price: 1, NumberOfSales: 1, availability: 1 });
        res.json(works);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Получение информации о магазинах
app.get('/Shop', async (req, res) => {
    try {
        const stores = await Shop.find();
        res.json(stores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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