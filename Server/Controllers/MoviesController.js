import asyncHandler from "express-async-handler";
import Movie from "../Modals/MoviesModal.js";
import { MoviesData } from "../Data/MovieData.js";

//@desc import movies
//@route POST /api/movies/import
//@access Public
const importMovies = asyncHandler(async (req, res) => {
  await Movie.deleteMany({});
  const movies = await Movie.insertMany(MoviesData);
  res.status(201).json(movies);
});

//@desc get all movies
//@route GET /api/movies
//@access Public
const getMovies = asyncHandler(async (req, res) => {
  try {
    //filter movies by category,time,language,rate,year and search
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };

    //load more movies functionality
    const page = Number(req.query.pageNumber) || 1; //if page number is not provided in query we set it to 1
    const limit = 6; //2 movies per page
    const skip = (page - 1) * limit; //skip 2 movies per page

    //find movies by query,skip and limit
    const movies = await Movie.find(query)
      // .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    //get total number of movies
    const count = await Movie.countDocuments(query);

    //send response with movies and total number of movies
    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit), //total number of pages
      totalMovies: count, //total number of movies
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Error : ${error.message}`);
  }
});

//@desc get movie by id
//@route GET /api/movies/:id
//@access Public
const getMovieById = asyncHandler(async (req, res) => {
  try {
    //find movie by id in db
    const movie = await Movie.findById(req.params.id);
    //if movie found send to client
    if (movie) {
      res.json(movie);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//@desc get top rated movies
//@route GET /api/movies/rated/top
//@access Public
const getTopRatedMovies = asyncHandler(async (req, res) => {
  try {
    //find top rated movies
    const movies = await Movie.find({}).sort({ rate: -1 });
    //send top rated movies to client
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//@desc get random movies
//@route GET /api/movies/random/all
//@access Public
const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    //find random movies
    const movies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    //send random movies to the client
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//**************************Private Controller*********************

//@desc create movie review
//@route POST /api/movies/:id/reviews
//@access Private
const createMovieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    //find movie by id in database
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      //check if the user already reviewed the movie
      const alreadyReviewed = movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      //if already reviewed show error
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You already reviewed this movie");
      }
      const review = {
        userName: req.user.fullname,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(req.body.rating),
        comment,
      };
      //push the new review into the review array
      movie.reviews.push(review);
      //increment the number of reviews
      movie.numberOfReviews = movie.reviews.length;
      //calculate the new rate
      movie.rate =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;
      //save the movie in db
      await movie.save();
      res.status(201).json({ message: "Review Added" });
    } else {
      res.status(400);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//**************************Admin Controller*********************

//@desc update movie
//@route PUT /api/movies/:id
//@access Private/Admin
const updateMovie = asyncHandler(async (req, res) => {
  try {
    //get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
    } = req.body;
    //find movie by id in db
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      //update movie data
      movie.name = name || movie.name;
      movie.desc = desc || movie.desc;
      movie.image = image || movie.image;
      movie.titleImage = titleImage || movie.titleImage;
      movie.rate = rate || movie.rate;
      movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
      movie.category = category || movie.category;
      movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
      movie.time = time || movie.time;
      movie.language = language || movie.language;
      movie.year = year || movie.year;

      const updatedMovie = await movie.save();
      res.status(200).json(updatedMovie);
    } else {
      res.status(400);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//@desc delete movie
//@route DELETE /api/movies/:id
//@access Private/Admin
const deleteMovie = asyncHandler(async (req, res) => {
  try {
    //find movie by id in db
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      await movie.deleteOne();
      res.json({ message: "Movie removed" });
    } else {
      res.status(400);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//@desc delete all movie
//@route DELETE /api/movies
//@access Private/Admin
const deleteAllMovies = asyncHandler(async (req, res) => {
  try {
    //delete all movies
    await Movie.deleteMany({});
    res.json({ message: "All movies removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//@desc create movie
//@route POST /api/movies
//@access Private/Admin
const createMovie = asyncHandler(async (req, res) => {
  try {
    //get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
    } = req.body;
    //create new movie
    const movie = new Movie({
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      userId: req.user._id,
    });
    if (movie) {
      const createMovie = await movie.save();
      res.status(201).json(createMovie);
    } else {
      res.status(400);
      throw new Error("Invalid movie data");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export {
  importMovies,
  getMovies,
  getMovieById,
  getTopRatedMovies,
  getRandomMovies,
  createMovieReview,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
  createMovie,
};
