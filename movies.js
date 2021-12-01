import { createMovie, getMovieById, deleteMovieById, updateMovieById, getMovies } from "./helper.js";
// import { app } from "./index.js";
import express from 'express';

const router = express.Router()


router.get("", async (req, res) => {

  // let filterMovie = movies;
  const filter = req.query;
  console.log(filter);
  if (filter.rating) {
    filter.rating = +filter.rating;
  }
  const movies = await getMovies(filter);
  console.log(movies);
  res.send(movies);
});

router.post('', async (req, res) => {
  const data = req.body;
  const result = await createMovie(data);
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await getMovieById(id);
  console.log(movie);
  movie
    ? res.send(movie)
    : res.status(404).send({ msg: "No matching movie found" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await deleteMovieById(id);
  // console.log(movie);
  movie.deletedCount > 0
    ? res.send(movie)
    : res.status(404).send({ msg: "No matching movie found" });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await updateMovieById(id, data);
  const updatedRecord = await getMovieById(id);
  console.log(updatedRecord);
  res.send(result);
});

export const moviesRouter = router;