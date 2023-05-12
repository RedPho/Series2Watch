const Genre = require("../models/genre");
const Serie = require("../models/serie");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { request } = require("express");

// Display list of all Series.
exports.serie_list = asyncHandler(async (req, res, next) => {
  const allSeries = await Serie.find().sort({ title: 1 }).exec();
  res.render("serie_list", {
    title: "Serie List",
    list_series: allSeries,
  });
});

exports.serie_detail = asyncHandler(async (req, res, next) => {
  const serie = await Serie.findById(req.params.id).populate("genres").exec();

  res.render("serie_detail", {
    title: serie.title,
    serie: serie,
    genre_list: serie.genres,
  });
});

exports.serie_create_get = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().sort({name: 1}).exec();
  res.render('serie_form', { all_genres: allGenres });
});

exports.serie_create_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    req.body.stars = req.body.stars.split(",");
    next();
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("creator", "Creator must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("picture", "Something wrong with picture")
    .trim(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const serie = new Serie({
      title: req.body.title,
      creator: req.body.creator,
      summary: req.body.summary,
      stars: req.body.stars,
      genres: req.body.genre,
      year_of_start: req.body.start,
      year_of_end: req.body.end,
      picture_url: req.body.picture
    });

    if (!errors.isEmpty()) {
      const allGenres = await Genre.find().exec();
      res.render("serie_form", {
        all_genres: allGenres,
      });
    } else {
      await serie.save();
      res.redirect(serie.url);
    }
  }),
];

exports.serie_delete_get =  asyncHandler(async (req, res, nest) => {
  const serie = await Serie.findById(req.params.id);
  res.render("serie_delete", {
    title: "Delete Serie",
    serie: serie
  });
});

exports.serie_delete_post =  asyncHandler(async (req, res, nest) => {
  await Serie.findByIdAndDelete(req.body.serieid);
  res.redirect("/series");
});

exports.serie_update_get =  asyncHandler(async (req, res, nest) => {
  const serie = await Serie.findById(req.params.id).populate("genres").exec();
  const all_genres = await Genre.find().exec();
  all_genres.forEach((genre) => {
    serie.genres.forEach((g) => {
      if (genre.name == g.name) {
        genre.checked = true;
      }
    })
  })
  res.render("serie_form", { serie: serie, all_genres: all_genres });
});

exports.serie_update_post =  [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    req.body.stars = req.body.stars.split(",");
    next();
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("creator", "Creator must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("picture", "Something wrong with picture")
    .trim(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
      console.log("some errors")
      res.redirect("/serie/" + req.params.id + "/update");
    } else {
      await Serie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        creator: req.body.creator,
        summary: req.body.summary,
        stars: req.body.stars,
        genres: req.body.genre,
        year_of_start: req.body.start,
        year_of_end: req.body.end,
        picture_url: req.body.picture
      });
      console.log("updated")
      res.redirect("/serie/" + req.params.id);
    }
  }),
];