var express = require('express');
const tournament_controller = require('../controllers/tournament');
var router = express.Router();

router.get('/', tournament_controller.tournament_view_all_Page);
router.post('/', tournament_controller.tournament_create_post);
router.get('/tournaments/:id', tournament_controller.tournament_detail);

module.exports = router;
