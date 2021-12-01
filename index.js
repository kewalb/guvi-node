import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
import { moviesRouter } from "./movies.js";
export const app = express();

const PORT = 9000;
dotenv.config();// all keys will be placed in procss.env
// console.log(process.env.MONGO_URL)

// creating a connection to mongo
async function createConnection() {
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  console.log("MongoDB connected");
  return client;
}



// middleware
app.use(express.json()) // inbuilt middleware
app.use("/movies", moviesRouter)

export const client =  await createConnection();

app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(PORT, () => console.log("Server Running at port-", PORT));


