const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SerieSchema = new Schema({
  title: { type: String, required: true },
  stars: [{ type: String, required: true }],
  summary: { type: String, required: true },
  creator: { type: String, required: true },
  genres: [{ type: Schema.ObjectId, ref: "Genre" }],
  year_of_start: { type: Number },
  year_of_end: { type: Number },
  picture_url: { type: String },
});

// Virtual for this book instance URL.
SerieSchema.virtual("url").get(function () {
  return "/serie/" + this._id;
});

// Export model.
module.exports = mongoose.model("Serie", SerieSchema);