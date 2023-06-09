const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  description: { type: String }
});

// Virtual for this genre instance URL.
GenreSchema.virtual("url").get(function () {
  return "/genre/" + this._id;
});

// Export model.
module.exports = mongoose.model("Genre", GenreSchema);