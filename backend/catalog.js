const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

async function main() {
  const mongoClient = new MongoClient(url);
  try {
    await mongoClient.connect();
    const db = mongoClient.db('usersdb');
    const catalogCollection = db.collection('Catalog');
    const shopCollection = db.collection('Shop');

    // Получаем все документы из коллекции Catalog
    const catalogItems = await catalogCollection.find().toArray();

    // Обновляем цены в коллекции shop
    for (const catalogItem of catalogItems) {
      const newPrice = catalogItem.price * 0.6; // Новая цена
      await shopCollection.updateOne(
        { catalogId: catalogItem.catalog_id }, // Идентификатор записи в shop
        { $set: { opt_price: newPrice } } // Обновленная цена
      );
    }

    console.log('Цены в магазине обновлены');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoClient.close();
  }
}

main().catch(console.error);