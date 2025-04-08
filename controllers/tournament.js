var Tournament = require('../models/tournament');

exports.tournament_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Tournament list');
};

exports.tournament_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Tournament detail: ' + req.params.id);
};

exports.tournament_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Tournament create POST');
};

exports.tournament_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Tournament delete DELETE '+ req.params.id);
};

exports.tournament_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Tournament update PUT' + req.params.id);
};