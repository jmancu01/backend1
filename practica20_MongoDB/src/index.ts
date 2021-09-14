import {myServer} from './services/server'

import { Schema, model, connect } from 'mongoose';

const port = 8080 || process.env.PORT
const URL = 'mongodb://localhost:27017/ecommerce'

myServer.listen(port, () => console.log(`Listening in port: ${port}`));

async function run(): Promise<void> {
  // 4. Connect to MongoDB
  await connect(URL);
}

run().catch(err => console.log(err));