const m = require('mongodb');
const env = process.env;

const mongodbUri = env.MONGODB_URI || 'mongodb://localhost:27017/test';
let _db;
let _mongoCli;

const mongoRef = async () => {
  if (_db) return _db;

  console.log(`connection to ${mongodbUri}`)

  _mongoCli = new m.MongoClient(mongodbUri);

  await _mongoCli.connect();
  _db = _mongoCli.db('test')

  return _db;
}

const shutdown = async() => {
  _mongoCli.close();
}

const insertData = async() => {
  try {
    const db = await mongoRef();
    
    const payload = [
      { index: 0, name: "Sunday" },
      { index: 1, name: "Monday" },
      { index: 2, name: "Tuesday" },
      { index: 3, name: "Wednesday" },
      { index: 4, name: "Thursday" },
      { index: 5, name: "Friday" },
      { index: 6, name: "Saturday" }
    ];

    await db.collection('dows').insertMany(payload);
  } catch(e) { console.error(e) }
}

const loadData = async () => {
  const db = await mongoRef();
  const dows = await db.collection('dows').find({}).toArray();
  return dows;
}

// using IIFE to easily migrate to DENO 
// (async function main() {
//   // await insertData();
//   const data = await loadData();
//   console.log(`data loaded: ${JSON.stringify(data)}`);
// })();

module.exports = { shutdown, insertData, loadData }