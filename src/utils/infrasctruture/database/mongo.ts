import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/';
const db_name = process.env.MONGODB_DATABASE_NAME || 'my-app-db';

let client: MongoClient;

export async function connectToMongo(): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  return client.db(db_name);
}
