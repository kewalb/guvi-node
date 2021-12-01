import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
const app = express();

const PORT = 9000;
dotenv.config();
console.log(process.env.MONGO_URL)

// creating a connection to mongo
async function createConnection() {
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  console.log("MongoDB connected");
  return client;
}



// middleware
app.use(express.json())// inbuilt middleware

const client =  await createConnection();

app.get("/", (req, res) => {
  res.send("hello World");
});

// const movies = [{
//     id: 1,
//     name: "The Shawshank Redemption (1994)",
//     poster: "https://rukminim1.flixcart.com/image/416/416/poster/h/m/z/posterskart-the-shawshank-redemption-poster-pksr01-medium-original-imaebcuhbuhfhryb.jpeg?q=70",
//     summary: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
//     rating: 9,
//     language: "telugu"
//   },

//   {
//     id: 2,
//     name:"The Godfather",
//     poster: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
//     summary: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
//     rating: 8,
//     language: "english"
//   },

//   {
//     id: 3,
//     name: "The Dark Knight",
//     poster: "https://images-na.ssl-images-amazon.com/images/I/91ebheNmoUL._RI_.jpg",
//     summary: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
//     rating: 7.3,
//     language: "telugu"
//   },

//   {
//     id: 4,
//     name: "12 Angry Men",
//     poster: "https://static2.srcdn.com/wordpress/wp-content/uploads/2020/04/head.v1.cropped.jpg",
//     summary: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
//     rating: 8.5,
//     language: "telugu"
//   },

//   {
//     id: 5,
//     name: "Schindler's List",
//     poster: "https://www.uphe.com/sites/default/files/styles/scale__344w_/public/2018/10/schindler2018_poster.jpg",
//     summary: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
//     rating: 7,
//     language: "english"
//   },

//   {
//     id: 6,
//     name: "The Lord of the Rings: The Return of the King",
//     poster: "https://sm.ign.com/ign_ap/screenshot/default/the-lord-of-the-rings-the-return-of-the-king-59b7d7a3775bf_dhkf.jpg",
//     summary: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
//     rating: 8.9,
//     language: "english"
//   }]

app.get("/movies", async(req, res) => {
  
  // let filterMovie = movies;
  const filter = req.query
  console.log(filter)
  if(filter.rating){
    filter.rating = +filter.rating
  }
  const movies = await client.db("guvi").collection("movies").find(filter).toArray()
  console.log(movies)

  // if (req.query) {
  //   const { language, rating } = req.query;
  //   if (rating) {1
  //     filterMovie = filterMovie.filter((x) => +rating === x.rating);
  //   }

  //   if (language) {
  //     filterMovie = filterMovies.filter((x) => x.language === language);
  //   }
  // } else {
  //   res.send(movies);
  // }
  res.send(movies)
});

app.post('/movies', async(req, res) => {
  const data = req.body
  const result = await client.db("guvi").collection("movies").insertMany(data)
  res.send(result)
})

app.get("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await client.db("guvi").collection("movies").findOne({id: +id})
  console.log(movie);
  movie
    ? res.send(movie)
    : res.status(404).send({ msg: "No matching movie found" });
});

app.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await client.db("guvi").collection("movies").deleteOne({id: +id})
  // console.log(movie);
  movie.deletedCount>0
    ? res.send(movie)
    : res.status(404).send({ msg: "No matching movie found" });
});

app.put("/movies/:id", async (req, res) => {
  const {id} = req.params
  const data = req.body
  const result = await client.db("guvi").collection("movies").updateOne({id:+id}, {$set: data})
  const updatedRecord = await client.db("guvi").collection("movies").findOne({id:+id})
  console.log(updatedRecord)
  res.send(result)
})

app.listen(PORT, () => console.log("Server Running at port-", PORT));
