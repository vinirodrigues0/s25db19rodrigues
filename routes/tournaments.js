var express = require('express');
const tournament_controller = require('../controllers/tournament');
var router = express.Router();

/* GET tournaments */
router.get('/', tournament_controller.tournament_view_all_Page);

router.post('/', tournament_controller.tournament_create_post);

module.exports = router;
