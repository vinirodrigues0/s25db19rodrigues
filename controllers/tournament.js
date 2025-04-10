var Tournament = require('../models/tournament');

exports.tournament_list = async function(req, res) {
    try {
        const theTournaments = await Tournament.find();
        res.send(theTournaments);
    }
    catch(err) {
        res.status(500);
        res.send(`{"error":${err}}`);
    }
};

exports.tournament_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Tournament detail: ' + req.params.id);
};

exports.tournament_create_post = async function(req, res) {
    console.log(req.body);
    let document = new Tournament();

    document.name = req.body.name;
    document.year = req.body.year;
    document.location = req.body.location;

    try {
        let result = await document.save();
        res.send(result);
    }
    catch(err) {
        res.status(500);
        res.send(`{"error":${err}}`);
    }
};

exports.tournament_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Tournament delete DELETE '+ req.params.id);
};

exports.tournament_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Tournament update PUT' + req.params.id);
};

exports.tournament_view_all_Page = async function(req, res) {
    try {
        const theTournaments = await Tournament.find();
        res.render('tournaments', {title: 'Tournament Search Results', results: theTournaments});
    }
    catch(err) {
        res.status(500);
        res.send(`{"error":${err}}`);
    }
}