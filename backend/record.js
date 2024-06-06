const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);
const records = [
    {record_id: 1, name: "Группа Крови", genre: "Рок", performer: "Кино", year: 2016, company: "Moroz Records", type_of_media: "Виниловая пластинка"} ,
    {record_id: 2, name: "HOTEL CALIFORNIA", genre: "Рок", performer: "EAGLES", year: 2014, company: "Rhino Records", type_of_media: "Виниловая пластинка"}, 
    {record_id: 3, name: "КОРОЛЬ И ШУТ - ЛУЧШЕЕ", genre: "Рок", performer: "КОРОЛЬ И ШУТ", year: 2023, company: "United Music", type_of_media: "Виниловая пластинка"},

    {record_id: 4, name: "ТЫ-МОЯ МЕЛОДИЯ", genre: "Поп-музыка", performer: "МУСЛИМ МАГОМАЕВ", year: 2015, company: "Бомба Мьюзик", type_of_media: "Виниловая пластинка"} ,
    {record_id: 5, name: "= (EQUALS)", genre: "Поп-музыка", performer: "ED SHEERAN", year: 2021, company: "Warner Music", type_of_media: "Виниловая пластинка"}, 
    {record_id: 6, name: "ULTRAVIOLENCE", genre: "Поп-музыка", performer: "LANA DEL REY", year: 2014, company: "Polydor", type_of_media: "Виниловая пластинка"},

    {record_id: 7, name: "THE FOUR SEASONS", genre: "Классика", performer: "VIVALDI", year: 2017, company: "Warner Classics", type_of_media: "Виниловая пластинка"} ,
    {record_id: 8, name: "BACH, JS: COMPLETE SONATAS & PARTITAS FOR SOLO VIOLIN", genre: "Классика", performer: "ITZHAK PERLMAN", year: 2021, company: "Warner Music Classic", type_of_media: "Виниловая пластинка"}, 
    {record_id: 9, name: "THE HEART OF THE CELLO", genre: "Классика", performer: "THE HEART OF THE CELLO", year: 2017, company: "Warner Classics", type_of_media: "Виниловая пластинка"},

    {record_id: 10, name: "IGOR", genre: "Хип-Хоп", performer: "TYLER, THE CREATOR", year: 2019, company: "Columbia", type_of_media: "Виниловая пластинка"} ,
    {record_id: 11, name: "DAWN FM", genre: "Хип-Хоп", performer: "DAWN FM", year: 2022, company: "Republic", type_of_media: "Виниловая пластинка"}, 
    {record_id: 12, name: "KAMIKAZE", genre: "Хип-Хоп", performer: "EMINEM", year: 2018, company: "Aftermath Entertainment / Shady Records / Interscope Records", type_of_media: "Виниловая пластинка"},
];
    
 async function run() {
    try {
    await mongoClient.connect();
    const db = mongoClient.db("usersdb");
    const collection = db.collection("Record");
    const results = await collection.insertMany(records);
    console.log(results);
    console.log(records);
}catch(err) {
    console.log(err);
} finally {
    await mongoClient.close();
}
}
run().catch(console.error);