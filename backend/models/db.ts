import { MongoClient } from 'https://deno.land/x/mongo@v0.13.0/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const { MONGO_URI } = config({ safe: true });

const client = new MongoClient();
client.connectWithUri(`${MONGO_URI}`);

const db = client.database('denoapi');

export default db;
