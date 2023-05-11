#! /usr/bin/env node

console.log(
  'This script populates some test genres and series to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Genre = require("./models/genre");
const Serie = require("./models/serie");

const genres = [];
const series = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createSeries();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function genreCreate(name, description) {
  const genre = new Genre({ name: name, description: description });
  await genre.save();
  genres.push(genre);
  console.log(`Added genre: ${name}: ${description}`);
}


async function serieCreate(title, summary, stars, creator, genres, startDate, endDate, picture_url = null) {
  seriedetail = {
    title: title,
    summary: summary,
    stars: stars,
    creator: creator,
    genres: genres,
    year_of_start: startDate,
    year_of_end: endDate
  };
  if (picture_url) {
    seriedetail.picture_url = picture_url
  }

  const serie = new Serie(seriedetail);
  await serie.save();
  series.push(serie);
  console.log(`Added Serie: ${title}`);
}


async function createGenres() {
  console.log("Adding Genres");
  await Promise.all([
    genreCreate("Fantasy", "Something fantastic"),
    genreCreate("Science Fiction", "Nerdy stuff"),
    genreCreate("Animated", "Animes are not for childs"),
    genreCreate("Drama", "Something from this, something from that"),
  ]);
}


async function createSeries() {
  console.log("Adding Series");
  await Promise.all([
    serieCreate(
      "Breaking Bad",
      "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
      ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
      "Vince Gilligan",
      [genres[3]],
      2008,
      2013
    ),
    serieCreate(
      "Chernobyl",
      "In April 1986, an explosion at the Chernobyl nuclear power plant in the Union of Soviet Socialist Republics becomes one of the world's worst man-made catastrophes.",
      ["Jessie Buckley", "Jared Harris", "Stellan Skarsgård"],
      "Craig Mazin",
      [genres[3]],
      2019,
      2019,
      "https://m.media-amazon.com/images/M/MV5BMmI2OTMxZTUtMTM5OS00MGNiLWFhNGMtYzJiODUwYjRmODA5XkEyXkFqcGdeQXVyMTM0NTc2NDgw._V1_.jpg"
    ),
    serieCreate(
      "Avatar: The Last Airbender",
      "In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny as the Avatar, and bring peace to the world.",
      ["Dee Bradley Baker", "Zach Tyler Eisen", "Mae Whitman"],
      "Michael Dante DiMartino and Bryan Konietzko",
      [genres[2], genres[0]],
      2005,
      2008,
      "https://m.media-amazon.com/images/M/MV5BODc5YTBhMTItMjhkNi00ZTIxLWI0YjAtNTZmOTY0YjRlZGQ0XkEyXkFqcGdeQXVyODUwNjEzMzg@._V1_.jpg"
    ),
  ]);
}
//////////// ALL INFO COME FROM IMDB WEBSITE ////////////