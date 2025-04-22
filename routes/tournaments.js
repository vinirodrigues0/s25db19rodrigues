var express = require('express');
const tournament_controller = require('../controllers/tournament');
const tournament = require('../models/tournament');
var router = express.Router();
const passport = require('passport');

const secured = (req, res, next) => {
    if(req.user) {
        return next();
    }
    res.redirect("/login");
};

router.get('/', tournament_controller.tournament_view_all_Page);
router.post('/', tournament_controller.tournament_create_post);
router.get('/tournaments/:id', tournament_controller.tournament_detail);
router.put('/tournaments/:id', tournament_controller.tournament_update_put);
router.delete('/tournaments/:id', tournament_controller.tournament_delete);
router.get('/detail', tournament_controller.tournament_view_one_Page);
router.get('/create', secured, tournament_controller.tournament_create_Page);
router.get('/update', secured, tournament_controller.tournament_update_Page);
router.get('/delete', secured, tournament_controller.tournament_delete_Page);
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

module.exports = router;
