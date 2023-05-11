const Genre = require("../models/genre");
const Serie = require("../models/serie");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all Series.
exports.serie_list = asyncHandler(async (req, res, next) => {
  const allSeries = await Serie.find().sort({ name: 1 }).exec();
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