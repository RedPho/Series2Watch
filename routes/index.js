var express = require('express');
var router = express.Router();

genre_controller = require('../controllers/genreController');
serie_controller = require('../controllers/serieController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/genres', genre_controller.genre_list);

router.get('/genre/:id', genre_controller.genre_detail);


router.get('/series', serie_controller.serie_list);

router.get('/serie/:id', serie_controller.serie_detail);


module.exports = router;
