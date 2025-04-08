var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var tournament_controller = require('../controllers/tournament');

router.get('/', api_controller.api);

router.post('/tournaments', tournament_controller.tournament_create_post);
router.delete('/tournaments/:id', tournament_controller.tournament_delete);
router.put('/tournaments/:id', tournament_controller.tournament_update_put);
router.get('/tournaments/:id', tournament_controller.tournament_detail);
router.get('/tournaments', tournament_controller.tournament_list);

module.exports = router;