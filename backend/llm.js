const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { MongoClient } = require('mongodb');

// Initialize Google Generative AI
const genAI = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY, // API key from environment variables
});

// MongoDB setup
const uri = process.env.MONGODB_URI; // MongoDB URI from environment variables
const client = new MongoClient(uri);
const dbName = 'vectorStore';
const collectionName = 'vectors';

const getMongoCollection = async () => {
  await client.connect();
  const db = client.db(dbName);
  return db.collection(collectionName);
};

// Function to embed, store, and query vectors
const processCode = async (code) => {
  const collection = await getMongoCollection();

  // Embed the code
  const codeVector = await genAI.embed(code);
  console.log('Code Vector:', codeVector);

  // Store the vector in MongoDB
  await collection.insertOne({ code, vector: codeVector });

  // Query similar vectors
  const queryVector = codeVector; // Use the same vector or another one
  const searchResults = await collection.aggregate([
    {
      "$search": {
        "index": process.env.SEARCH_INDEX_NAME, // Index name from environment variables
        "knn": {
          "field": "vector",
          "vector": queryVector,
          "k": 5 // Number of nearest neighbors to return
        }
      }
    }
  ]).toArray();

  console.log('Similar Vectors:', searchResults);

  // Generate documentation
  const prompt = `Generate documentation for the following code:\n\n${code}\n\nDocumentation:`;
  const result = await genAI.generate(prompt);

  console.log('Generated Documentation:\n', result);
};

// Sample code
const code = `
function add(a, b) {
  return a + b;
}
`;

// Generate and print documentation and query results
processCode(code).catch(err => {
  console.error('Error:', err);
}).finally(() => {
  client.close();
});
