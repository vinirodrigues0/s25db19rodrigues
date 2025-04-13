var express = require('express');
const tournament_controller = require('../controllers/tournament');
var router = express.Router();

router.get('/', tournament_controller.tournament_view_all_Page);
router.post('/', tournament_controller.tournament_create_post);
router.get('/tournaments/:id', tournament_controller.tournament_detail);
router.put('/tournaments/:id', tournament_controller.tournament_update_put);
router.delete('/tournaments/:id', tournament_controller.tournament_delete);
router.get('/detail', tournament_controller.tournament_view_one_Page);

module.exports = router;
