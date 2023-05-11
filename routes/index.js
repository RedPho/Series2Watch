var express = require('express');
const { genre_create_get } = require('../controllers/genreController');
var router = express.Router();

genre_controller = require('../controllers/genreController');
serie_controller = require('../controllers/serieController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/genres', genre_controller.genre_list);

router.get('/genre/create', genre_controller.genre_create_get)

router.post('/genre/create', genre_controller.genre_create_post)

router.get('/genre/:id/delete', genre_controller.genre_delete_get)

router.post('/genre/:id/delete', genre_controller.genre_delete_post)

router.get('/genre/:id/update', genre_controller.genre_update_get)

router.post('/genre/:id/update', genre_controller.genre_update_post)

router.get('/genre/:id', genre_controller.genre_detail);



router.get('/series', serie_controller.serie_list);

router.get('/serie/create', serie_controller.serie_create_get);

router.post('/serie/create', serie_controller.serie_create_post);

router.get('/serie/:id/delete', serie_controller.serie_delete_get)

router.post('/serie/:id/delete', serie_controller.serie_delete_post)

router.get('/serie/:id/update', serie_controller.serie_update_get)

router.post('/serie/:id/update', serie_controller.serie_update_post)

router.get('/serie/:id', serie_controller.serie_detail);


module.exports = router;
