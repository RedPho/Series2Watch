const Genre = require("../models/genre");
const Serie = require("../models/serie");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all Genre.
exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().sort({ name: 1 }).exec();
  res.render("genre_list", {
    title: "Genre List",
    list_genres: allGenres,
  });
});

exports.genre_detail = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id).exec();
  const series = await Serie.find({ genres: req.params.id }).exec();
  res.render("genre_detail", {
    title: "Genre List",
    genre: genre,
    serie_list: series
  });
});