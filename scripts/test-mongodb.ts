import { MongoClient } from 'mongodb';


const uri = "mongodb+srv://kryan:everleigh123@cluster0.lsecc.mongodb.net/surveys?retryWrites=true&w=majority";
if (!uri) throw new Error('DATABASE_URL is not defined');

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db('surveys');
    const surveysCount = await db.collection('survey').countDocuments();
    console.log(`Number of surveys: ${surveysCount}`);
  } catch (error) {
    console.error('Failed to connect:', error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// Add this line to make it a module
export {};