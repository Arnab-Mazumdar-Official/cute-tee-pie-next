import mongoose from 'mongoose';

const connection = {}; 

// if (!process.env.MONGODB_URI) {
//   throw new Error('MONGODB_URI environment variable is not defined');
// }

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  // const db = await mongoose.connect(process.env.MONGODB_URI, {
  const db = await mongoose.connect('mongodb+srv://arnabmazumdar9:arnab2000@mul-tee-versse.olkqjby.mongodb.net/?retryWrites=true&w=majority', {
    dbName: 'mul_tee_versse',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
