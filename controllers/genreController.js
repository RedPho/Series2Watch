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
    title: "Genre Detail",
    genre: genre,
    serie_list: series
  });
});

exports.genre_create_get = asyncHandler(async (req, res, nest) => {
  res.render("genre_form", {
    title: "New Genre"
  })
})

exports.genre_create_post = [
  body("description")
    .trim()
    .escape(),

    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a Book object with escaped and trimmed data.
      const genre = new Genre({
        name: req.body.name,
        description: req.body.description
      });
  
      if (!errors.isEmpty()) {
        console.log(errors)
        res.render("genre_form", {title: "New Genre"});
      } else {
        await genre.save();
        res.redirect(genre.url);
      }
    }),
];

exports.genre_delete_get =  asyncHandler(async (req, res, nest) => {
  const genre = await Genre.findById(req.params.id);
  res.render("genre_delete", {
    title: "Delete Genre",
    genre: genre
  });
});

exports.genre_delete_post =  asyncHandler(async (req, res, nest) => {
  await Genre.findByIdAndDelete(req.body.genreid);
  res.redirect("/genres");
});

exports.genre_update_get =  asyncHandler(async (req, res, nest) => {
  const genre = await Genre.findById(req.params.id).exec();
  res.render("genre_form", { genre: genre});
});

exports.genre_update_post =  asyncHandler(async (req, res, nest) => {
  await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name, description: req.body.description})
  res.redirect("/genre/" + req.params.id);
});