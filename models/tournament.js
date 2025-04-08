const mongoose = require('mongoose');
const tournamentSchema = mongoose.Schema({
    name: String,
    year: Number,
    location: String
});

module.exports = mongoose.model("Tournament", tournamentSchema);