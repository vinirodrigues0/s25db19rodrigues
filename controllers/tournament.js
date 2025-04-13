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

exports.tournament_detail = async function(req, res) {
    console.log("detail" + req.params.id);
    try {
        const result = await Tournament.findById(req.params.id);
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": document for id ${req.params.id} not found}`);
    }
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

exports.tournament_delete = async function(req, res) {
    console.log("delete" + req.params.id);
    try {
        const result = await Tournament.findByIdAndDelete(req.params.id);
        console.log("Removed" + result);
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": Error deleting ${err}}`);
    }
};

exports.tournament_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Tournament.findById(req.params.id);
        if (req.body.name) toUpdate.name = req.body.name;
        if (req.body.year) toUpdate.year = req.body.year;
        if (req.body.location) toUpdate.location = req.body.location;
        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed}`);
    }
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

exports.tournament_view_one_Page = async function(req, res) {
    console.log("single view for id" + req.query.id);
    try {
        const result = await Tournament.findById(req.query.id);
        res.render('tournamentdetail', { title: 'Tournament Detail', toShow: result });
    }
    catch(err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
}