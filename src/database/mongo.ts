import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb://root:example@mongo:27017/';
let client: MongoClient;

export async function connectToMongo(): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  return client.db('my-app-db');
}
