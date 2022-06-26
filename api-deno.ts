import {
  Bson,
  MongoClient,
  //@ts-ignore
} from "https://deno.land/x/mongo@v0.30.1/mod.ts";

//@ts-ignore
const mongodbUri: string = Deno.env.get("MONGODB_URI") || 'mongodb://localhost:27017/test';

let _db: any;
let _mongoCli: MongoClient;

const mongoRef = async () => {
  if (_db) return _db;

  console.log(`connection to ${mongodbUri}`)

  _mongoCli = new MongoClient();

  await _mongoCli.connect(mongodbUri);
  _db = _mongoCli.database('test')

  return _db;
}

export const insertData = async() => {
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

export const loadData = async () => {
  const db = await mongoRef();
  const dows = await db.collection('dows').find({}).toArray();
  return dows;
}

